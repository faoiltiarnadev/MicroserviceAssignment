var grpc = require('grpc');
var proto = grpc.load('anagramInterface.proto');
var client = new proto.anagram.AnagramService('backend:50051', grpc.credentials.createInsecure);

exports.index = function(request, response) {

    var anagram = getAnagram(response, request.query);

    response.locals.question = anagram.question;
    response.locals.answer = anagram.answer;

    response.render('anagramPuzzle');
};

function getAnagram(response, query) {

    console.log(query);

    var word;

    if (!query.word) {
        word = "hello";
    } else {
        word = query.word.toLocaleLowerCase();
    }

    var request = {
        word: word
    }

    client.getAnagram(request, function(error, anagram) {
        if (error) {
            response.end(JSON.stringify(error));
        } else {
            response.end(anagram);
        }
    });
}
