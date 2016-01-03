# NER-Node
Library to connect to Stanford NER local Server, send in the Raw Text and get back Entity JSON
**********************************************************************************************

Library is logic wise final but still needs some testing. You can use it and mark any issues and feedback.

You can look at the test.js and the SocketNER.js for documentation as the formal one is yet to be written.

functions and its parameters
```javascript
var SocketNER = require("./SocketNER")
function SocketNER(port, classifierFileName, pathToNER, function (OBJ) {
	OBJ.parser = function (taggedText, requiredEntity) {  } // you can also redefine it
	OBJ.getEntities(rawText, requiredEntity, callback(JSONdata))
	OBJ.close() // it closes the socket and kills the server process
})
```
