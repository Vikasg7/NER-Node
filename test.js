var nerServer = require("./SocketNER")

nerServer(8080, null , "./StanfordNER/", function (ner) {
	ner.getEntities("My Name is\n Vikas Gautam.\rMy name is \rJones Andrew", "PERSON", function (data) {
		// you can define your own parser function to get the output in desired format
		// ner.parser = function (taggedText) () {  }
		console.log(JSON.stringify(data))
		ner.close()
	})
})