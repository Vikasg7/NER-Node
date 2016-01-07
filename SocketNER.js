var spawn = require("child_process").spawn
var socket = require("net").Socket()
var deasync = require("deasync")
// The purpose of deasync is to make the getEntities function synchronous 
// without guessing the time it would take to finish. Previously, I was using
// socket.on(data, function () {...}) with a callback. But the downside was when I 
// used the getEntities function in a loop, NodeJs warns me of Memory leak, as I was 
// registering so many on("data") events. So I register on("data") event only one time
// by taking the code out of getEntities function and by using a global variable jsonEntities.


function SocketNER(port, classifierFileName, pathToNER, callback) {
   //defining defaults if arguments is a false value
   port = port || 1234
   classifierFileName = classifierFileName || "english.all.3class.distsim.crf.ser.gz"
   pathToNER = pathToNER || "/"
   // using jsonEntities as a list is a clever technique of mine
   // to empty using .pop() while returning the value in getEntities function**
   var jsonEntities = []
   var taggedText
   var requiredEntityG
   var rawTextG

   // starting server as a seperate process
   var server = spawn(
      "java",[
         "-mx750m", "-cp",
         pathToNER + "stanford-ner.jar", 
         "edu.stanford.nlp.ie.NERServer", 
         "-loadClassifier", pathToNER + classifierFileName, 
            "-port", port, "-outputFormat", "inlineXML"
         ]
      )

   // Setup a Socket Connection after Server loads the Classifier
   // I don't know why server's stderr stream gets all output and why stdout don't
   server.stderr.on("data", function (data) {
      // Server would finish loading, when it flushes out 'done [x secs]'
      if (data.toString().search("done") !== -1) { callback(socketNER) }
   })
   

   // Adding event handlers to the socket
   socket.on("connect", function () { socket.write(rawTextG) })
   socket.on("error", function (err) { console.log(err.toString()) })
   socket.on("data", function (data) { taggedText = data.toString() })
   // The NER server (ie. the other end) sends FIN signal after each write request, thereby closes 
   // the socket at its end. So I am using the 'end' event to process the returned taggedText
   socket.on("end", function (err) {
      jsonEntities.push(socketNER.parser(taggedText, requiredEntityG))
   })


   var socketNER = {}
      
   socketNER.getEntities = function (rawText, requiredEntity) {
      // taking a copy of requiredEntity preference
      requiredEntityG = requiredEntity
      // replacing line breaks with spaces and adding two line breaks at the end
      // for an unknown reason. May be, it relates to how a request should be sent through socket.
      rawTextG = rawText.replace(/[\r\n\f\t\v]/g, " ") + "\n\n"
      // Reconnecting on each getEntities function call, that's neccessary as the NER sever closes
      // the socket after each such call.
      socket.connect(port)       
      // deasync would won't halt the Event Loop ie. it would also next events to be met
      // but at the same time, it won't exit this function untill jsonEntities comes back.
      deasync.loopWhile(function () { return (jsonEntities.length !== 1) })
      return jsonEntities.pop()  // ** or jsonEntities.shift()
   }

   // Closes the socket and kills the server process
   socketNER.close = function () {
      socket.end()
      server.kill()
   }

   // Passing in 'the parser' to the socketNER return object, 
   // so that user could be able to define his own parser later on
   socketNER.parser = function (taggedText, requiredEntity) {
      var matches, entities = {} //return value of parser function
      // Change the regex scope according to user's Entitry requirements
      // Please always pass the requiredEntity in Upper case as NER uses upper cased Tags
      var re = requiredEntity ? new RegExp(["<(",requiredEntity,"?)>(.*?)<\/",requiredEntity,"?>"].join(""), "g") 
                              : /<([A-Z]+?)>(.*?)<\/[A-Z]+?>/g
      while((matches = re.exec(taggedText)) !== null) {
         if (entities[matches[1]]) {
            // if tagName is present, then pushing in the tagValue Array
            entities[matches[1]].push(matches[2])
         }
         else {
            // otherwise adding the tagName with a new tagValue Array
            entities[matches[1]] = [matches[2]]
         }
      }
      return entities
   }

}

module.exports = SocketNER