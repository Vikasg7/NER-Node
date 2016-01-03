<h1>NER-Node</h2>
<h5>Library to connect to Stanford NER local Server, send in the Raw Text and get back Entity JSON</h5>

<h4>Installation</h4>
<ol>
	<li>
		Download the 
		<a href="https://github.com/Vikasg7/NER-Node/archive/master.zip">NER-Node</a>
		package
	</li>
	<li>Unzip it and cd to the extracted folder using Command line Terminal</li>
	<li>Use "npm install"</li>
</ol>
<h4>Usage</h4>
<p>Here is an example of how you can call the library :-</p>
```javascript
var socketNER = require("SocketNER")
socketNER(port, classifierFileName, pathToNER, function (obj) {
	// you can define your own function to parse tagged text
	obj.parser = function (taggedText) {..... return entities}
	// A Sync function to get the Entities JSON
	obj.getEntities(rawText, requiredEntity)
	// closes the server and socket when done
	obj.close()
})
```
<p>You can try the test.js and test2.js to test workability. 
I have added a note in the test flies on which files you require to run the NER server</p>