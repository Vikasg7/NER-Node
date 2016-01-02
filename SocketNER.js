var spawn = require("child_process").spawn
var socket = require("net").Socket()
var server

console.log("Creating the server...");

(function startServer() {
	server = spawn("java",["-mx750m", "-cp", "StanfordNER/stanford-ner.jar", "edu.stanford.nlp.ie.NERServer", "-loadClassifier", "StanfordNER/english.all.3class.distsim.crf.ser.gz", 
				   "-port", 8080, "-outputFormat", "inlineXML"
				   ])
})()

setTimeout(connectToServer, 10000) // server may take upto 10 seconds to load

function connectToServer() {

	socket.connect(8080, "localhost", function () {
		console.log("Connected to server!!")
		socket.write("My name is Vikas Gautam\n\n")
	})

	socket.on("data", function (data) {
		console.log(String(data))
		socket.end()
		server.kill()
	})

	socket.on("error", function (err) {
		console.log("This is my error")
		console.log(err.toString())
	})

	socket.on("end", function () {
		console.log("Connection has been closed successfully!!")
	})

}
