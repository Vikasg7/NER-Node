<h1>NER-Node</h2>
<h5>Library to connect to Stanford NER local Server, send in the Raw Text and get back Entity JSON</h5>

<h4><i>6X Performance Boost with <strong>Changed Syntax</strong> in versions 0.0.7 and further. Please do upgrade.</i></h4>

<h4>Installation</h4>
<ol>
	<li>npm install ner-node</li>
	<li>You can now try the test files to see the library working.</li>
</ol>
<h4>Usage</h4>
<p>Here is an example of how you can call the library :-</p>

````javascript
// Importing the module
var socketNER = require("ner-node")
// Creating an instance
var NER = socketNER(port, classifierFileName, pathToNER)
// Initiating Server and Client
NER.init()
// You can optionally define your own function to parse tagged text
NER.parser = function (taggedText) {..... return entities}
// Using the getEntities function of NER object anywhere to get the parsed entities
var entitiesJSON = NER.getEntities(rawText, requiredEntity)
// Closes the server and client when done
NER.close()

````
<p>
	<strong>Note:-</strong>
	The npm package doesn't come with StanfordNER folder. You can download the latest from Stanford NER website OR get it from the git hub repository.
</p>

<h4>Updates</h4>
<ul>
	<li>
		<h5>Versions upto 0.0.4</h5>
		<p>These versions uses node sockets to connect to NER server(A java command line command) but the sockets were very slow when it came to perfomance.</p>
	</li>
	<li>
		<h5>Versions 0.0.5 and 0.0.6</h5>
		<p>These version uses the NER Client(A java command line command) to ping NER server. I tested it out and found that it was way too fast and almost 6 times better with application, I was working on. This time I used Synchronize library to sync functions up But its disadvantage was that - It takes so many sync.fibar wrappers to keeps this working and that too wasn't possible in my case. Actually Synchronize library was useless and very frustrating.</p>
	</li>
	<li>
		<h5>Versions >=0.0.7</h5>
		<p>In this version, I switched back to deasync after doing some more standalone testing to convert async functions to sync one and able to create a fully sync API with node without any intentional sleeps. So there is a change in the sytax this time. This Version is even more efficient than previous versions.</p>
	</li>
</ul>

<h4>Issues & Suggestions</h4>
<p>If you find an issues using the Library OR if you have any suggestions to make it perform better, then you can write to us in the Issues Section.</p>

<h4>Donate</h4>
<p>If this repository helps you anyhow, please don't mind coming back and 
	<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=F3QQCWFPWHBYE" target="_blank">Buy Me Coffee</a>
OR you can use 
	<a href="https://gratipay.com/~xcelancer/" target="_blank">Gratipay</a>
to show your appreciation and gratitude.
</p>