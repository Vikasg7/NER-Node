// Note :-  For the purpose of this test, I have placed three files in the "./StanfordNER/" folder
// 1. english.all.3class.distsim.crf.ser.gz
// 2. english.all.3class.distsim.prop
// 3. stanford-ner.jar
// Latest Java (x86 or x64, based on your symtems architecture) should be installed at your placed
// for stanford-ner.jar to work and load the server


var rawText = 
[
	'Steven Paul Jobs (/\ˈdʒɒbz/; February 24, 1955 – October 5,',
	'2011) was an American technology entrepreneur, visionary and',
	'inventor. He was the co-founder, chairman, and chief executive',
	' officer (CEO) of Apple Inc.; CEO and largest shareholder of Pixar',
	' Animation Studios;[3] a member of The Walt Disney Company\'s board',
	' of directors following its acquisition of Pixar; and founder,',
	' chairman, and CEO of NeXT Inc. Jobs is widely recognized as',
	' a pioneer of the microcomputer revolution of the 1970s, along',
	' with Apple co-founder Steve Wozniak. Shortly after his death,',
	' Jobs\'s official biographer, Walter Isaacson, described him as the',
	' "creative entrepreneur whose passion for perfection and ferocious',
	' drive revolutionized six industries: personal computers, animated',
	' movies, music, phones, tablet computing, and digital',
	' publishing."[2]',
	'Adopted at birth in San Francisco, and raised in the San Francisco',
	' Bay Area during the 1960s, Jobs\'s countercultural lifestyle was a',
	' product of his time. As a senior at Homestead High School, in',
	' Cupertino, California, his two closest friends were the older',
	' engineering student (and Homestead High alumnus) Wozniak and his',
	' countercultural girlfriend, the artistically inclined Homestead',
	' High junior Chrisann Brennan. Jobs briefly attended Reed College',
	' in 1972 before dropping out, deciding to travel through India in',
	' 1974 and study Buddhism.',
]

// As the getEntities function is a synchronous function,
// you can use it inside a loop effectively.

var nerServer = require("./SocketNER")

nerServer(8080, null , "./StanfordNER/", function (ner) {

	rawText.forEach(function (text, i) {
		console.log(text)
		var jsonEntities = ner.getEntities(text, "")
		console.log(jsonEntities)
	})
	ner.close()
})