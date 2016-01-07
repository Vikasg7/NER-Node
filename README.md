<h1>NER-Node</h2>
<h5>Library to connect to Stanford NER local Server, send in the Raw Text and get back Entity JSON</h5>

<h4>Installation</h4>
<ol>
	<li>npm install ner-node</li>
	<li>You can now try the test files to see the library working.</li>
</ol>
<h4>Usage</h4>
<p>Here is an example of how you can call the library :-</p>

```

var socketNER = require("ner-node")
socketNER(port, classifierFileName, pathToNER, function (obj) {
	// you can define your own function to parse tagged text
	obj.parser = function (taggedText) {..... return entities}
	// A Sync function to get the Entities JSON
	var entitiesJSON = obj.getEntities(rawText, requiredEntity)
	// closes the server and socket when done
	obj.close()
})

```
<p>
	<strong>Note:-</strong>
	The npm package doesn't come with StanfordNER folder. You can download the latest from Stanford NER website OR get it from the git hub repository.
</p>

<h4>Issues & Suggestions</h4>
<p>If you find an issues using the Library OR if you have any suggestions to make it perform better, then you can write to us in the Issues Section.</p>

<h4>Donate</h4>
<p>If this repository helps you anyhow, please don't mind comming back and 
	<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=F3QQCWFPWHBYE" target="_blank">Buy Me Coffee</a>
</p>