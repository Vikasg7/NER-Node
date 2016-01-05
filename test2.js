// Terminal command to run the test file :- node test2.js

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

var nerServer = require("ner-node")

nerServer(8080, null , "./StanfordNER/", function (ner) {

	rawText.forEach(function (text, i) {
		var jsonEntities = ner.getEntities(text, "")
		console.log("Input Text :-\t\t", text)
		console.log("Entities parsed:-\t", JSON.stringify(jsonEntities))
		console.log("\n\n")
	})
	ner.close()
})

//Output

// Input Text :-		 Steven Paul Jobs (/ˈdʒɒbz/; February 24, 1955 – October 5,
// Entities parsed:-	 {"PERSON":["Steven Paul Jobs"]}



// Input Text :-		 2011) was an American technology entrepreneur, visionary and
// Entities parsed:-	 {}



// Input Text :-		 inventor. He was the co-founder, chairman, and chief executive
// Entities parsed:-	 {}



// Input Text :-		  officer (CEO) of Apple Inc.; CEO and largest shareholder of Pixar
// Entities parsed:-	 {"ORGANIZATION":["Apple Inc.","Pixar"]}



// Input Text :-		  Animation Studios;[3] a member of The Walt Disney Company's board
// Entities parsed:-	 {"ORGANIZATION":["Animation Studios","The Walt Disney Company"]}



// Input Text :-		  of directors following its acquisition of Pixar; and founder,
// Entities parsed:-	 {"ORGANIZATION":["Pixar"]}



// Input Text :-		  chairman, and CEO of NeXT Inc. Jobs is widely recognized as
// Entities parsed:-	 {"ORGANIZATION":["NeXT Inc"]}



// Input Text :-		  a pioneer of the microcomputer revolution of the 1970s, along
// Entities parsed:-	 {}



// Input Text :-		  with Apple co-founder Steve Wozniak. Shortly after his death,
// Entities parsed:-	 {"ORGANIZATION":["Apple"],"PERSON":["Steve Wozniak"]}



// Input Text :-		  Jobs's official biographer, Walter Isaacson, described him as the
// Entities parsed:-	 {"PERSON":["Walter Isaacson"]}



// Input Text :-		  "creative entrepreneur whose passion for perfection and ferocious
// Entities parsed:-	 {}



// Input Text :-		  drive revolutionized six industries: personal computers, animated
// Entities parsed:-	 {}



// Input Text :-		  movies, music, phones, tablet computing, and digital
// Entities parsed:-	 {}



// Input Text :-		  publishing."[2]
// Entities parsed:-	 {}



// Input Text :-		 Adopted at birth in San Francisco, and raised in the San Francisco
// Entities parsed:-	 {"LOCATION":["San Francisco","San Francisco"]}



// Input Text :-		  Bay Area during the 1960s, Jobs's countercultural lifestyle was a
// Entities parsed:-	 {"LOCATION":["Bay Area"]}



// Input Text :-		  product of his time. As a senior at Homestead High School, in
// Entities parsed:-	 {"ORGANIZATION":["Homestead High School"]}



// Input Text :-		  Cupertino, California, his two closest friends were the older
// Entities parsed:-	 {"LOCATION":["Cupertino","California"]}



// Input Text :-		  engineering student (and Homestead High alumnus) Wozniak and his
// Entities parsed:-	 {"PERSON":["Wozniak"]}



// Input Text :-		  countercultural girlfriend, the artistically inclined Homestead
// Entities parsed:-	 {}



// Input Text :-		  High junior Chrisann Brennan. Jobs briefly attended Reed College
// Entities parsed:-	 {"PERSON":["Chrisann Brennan"],"ORGANIZATION":["Reed College"]}



// Input Text :-		  in 1972 before dropping out, deciding to travel through India in
// Entities parsed:-	 {"LOCATION":["India"]}



// Input Text :-		  1974 and study Buddhism.
// Entities parsed:-	 {}