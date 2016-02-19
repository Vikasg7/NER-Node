var spawn = require("child_process").spawn
var sync = require("synchronize")

function SocketNER(port, classifierFileName, pathToNER, callback) {
   //defining defaults if arguments is a false value
   port = port || 1234
   classifierFileName = classifierFileName || "english.all.3class.distsim.crf.ser.gz"
   pathToNER = pathToNER || "/"
   var client

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

   // I don't know why server's stderr stream gets 
   // all output and why stdout don't
   server.stderr.on("data", function (data) {
      // Server would finish loading, 
      // when it flushes out 'done [x secs]'
      if (data.toString().search("done") > -1) { 
         startNERClient()
      }
   })
   
   function startNERClient() {
      client = spawn(
         "java",[
            "-cp",
            pathToNER + "stanford-ner.jar", 
            "edu.stanford.nlp.ie.NERServer", 
            "-port", port, "-client"
         ]
      )

      // This "data" listener would be removed soon.      
      client.stdout.on("data", reader) 

      function reader(data) {
         if (data.toString().trim() === "") {
            // Keeping the "data" listener untill the client is started.
            client.stdout.removeListener("data", reader)
            // Running Callback in fiber to make it sync aware
            sync.fiber(function () {
               callback(socketNER)
            })
         }
      }
   }

   function tagIt(rawText, reqEntity, cb) {
      client.stdin.write(rawText)
      client.stdout.once("data", function (data) {
         // Trim() is necessary to avoid leading and follwing line breaks.
         var taggedText = data.toString().trim()
         // Synchronize module follows (err, data) format for cb.
         cb(null, socketNER.parser(taggedText, reqEntity))
      })
   }

   var socketNER = {}

   socketNER.getEntities = function (rawText, reqEntity) {
      rawText = rawText.replace(/[\r\n\f\t\v]/g, " ") + "\n"      
      return sync.await(tagIt(rawText, reqEntity, sync.defer()))      
   }

   // Closes the socket and kills the server process
   socketNER.close = function () {
      client.kill()
      server.kill()
   }

   // Passing in 'the parser' to the socketNER return object, 
   // so that user could be able to define his own parser later on
   socketNER.parser = function (taggedText, requiredEntity) {
      var matches, entities = {} // return value of parser function
      requiredEntity = requiredEntity.toUpperCase()
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