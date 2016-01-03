var spawn = require("child_process").spawn
var socket = require("net").Socket()

function SocketNER(port, classifierFileName, pathToNER, callback) {
	//defining defaults if arguments is a false value
	port = port || 1234
	classifierFileName = classifierFileName || "english.all.3class.distsim.crf.ser.gz"
	pathToNER = pathToNER || "/"

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
   		if (String(data).search("done") > -1) {
   			// When Socket is open to Server, invoking a callback function socketNER Object
   			socket.connect(port, function () { callback(socketNER) })
   			socket.on("error", function (err) { console.log(err.toString()) })
   		}
   	})

	var socketNER = {}
   	socketNER.getEntities = function (rawText, requireEntity, callback) {
   		// replacing line breaks with spaces and adding two line breaks at the end
   		// for an unknown reason. May be, it relates to how an request should be sent
   		rawText = rawText.replace(/[\r\n]/g, " ") + "\n\n"
   		socket.write(rawText)
   		socket.on("data", function (data) {
   			callback(socketNER.parser(data.toString(), requireEntity))
   		})
   	}

   	socketNER.close = function () {
   		socket.end()
   		server.kill()
   	}

   	// Passing in the parser to the socketNER return object, 
   	// so that user could be able to define his own parser later on
   	socketNER.parser = function (taggedText, requiredEntity) {
   		var matches
   		var entities = {}	//return value of parser function
   		// Change the regex scope according to user's Entitry requirements
   		// Please always pass the requireEntity in Upper case as NER uses upper cased Tags
   		var re = requiredEntity ? new RegExp(["<(",requiredEntity,")>(.*?)<\/",requiredEntity,">"].join(""), "g") 
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