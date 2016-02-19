// Terminal command to run the test file :- node test.js
var rawText = 
[
	'Steven Paul Jobs (/\ˈdʒɒbz/; February 24, 1955 – October 5,',
	'2011) was an American technology entrepreneur, visionary and ',
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
].join(" ")

var nerServer = require("./SocketNER.js")
nerServer(8080, null , "./StanfordNER/", function (ner) {
	var jsonEntities = ner.getEntities(rawText, "")
	console.log("Test1 All Entities:-")
	console.log(jsonEntities)

	var persons = ner.getEntities(rawText, "PERSON")
	console.log("\n\nTest2 Only Persons:-")
	console.log(persons)

	var organizations = ner.getEntities(rawText, "ORGANIZATION")
	console.log("\n\nTest3 Only Organizations:-")
	console.log(organizations)

	var locations = ner.getEntities(rawText, "LOCATION")
	console.log("\n\nTest4 Only Locations:-")
	console.log(locations)

	ner.close()
})

//Output
// Test1 All Entities:-
// { PERSON: 
//    [ 'Steven Paul Jobs',
//      'Steve Wozniak',
//      'Walter Isaacson',
//      'Wozniak',
//      'Chrisann Brennan' ],
//   ORGANIZATION: 
//    [ 'Apple Inc.',
//      'Pixar  Animation Studios',
//      'The Walt Disney Company',
//      'Pixar',
//      'NeXT Inc',
//      'Apple',
//      'Homestead High School',
//      'Homestead High',
//      'Reed College' ],
//   LOCATION: 
//    [ 'San Francisco',
//      'San Francisco  Bay Area',
//      'Cupertino',
//      'California',
//      'India' ] }


// Test2 Only Persons:-
// { PERSON: 
//    [ 'Steven Paul Jobs',
//      'Steve Wozniak',
//      'Walter Isaacson',
//      'Wozniak',
//      'Chrisann Brennan' ] }


// Test3 Only Organizations:-
// { ORGANIZATION: 
//    [ 'Apple Inc.',
//      'Pixar  Animation Studios',
//      'The Walt Disney Company',
//      'Pixar',
//      'NeXT Inc',
//      'Apple',
//      'Homestead High School',
//      'Homestead High',
//      'Reed College' ] }


// Test4 Only Locations:-
// { LOCATION: 
//    [ 'San Francisco',
//      'San Francisco  Bay Area',
//      'Cupertino',
//      'California',
//      'India' ] }