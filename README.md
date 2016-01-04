<h1>NER-Node</h2>
<h5>Library to connect to Stanford NER local Server, send in the Raw Text and get back Entity JSON</h5>

<h4>Installation</h4>
<ol>
	<li>
		Download the 
		<a href="https://github.com/Vikasg7/NER-Node/archive/master.zip" target="_blank">NER-Node</a>
		package
	</li>
	<li>Unzip it and cd to the extracted folder using Command line Terminal</li>
	<li>Use "npm install"</li>
	<li>You can now try the test files to see the library working.</li>
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

<h4>Issues & Suggestions</h4>
<p>If you find an issues using the Library OR if you have any suggestions to make it perform better, then you can write to us in the Issues Section.</p>

<h4>Donate</h4>
<p>If this repository helps you anyhow and you can want to contribute, then you can 
	<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=F3QQCWFPWHBYE" target="_blank">Buy Me Coffee</a>
</p>