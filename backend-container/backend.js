var url = require('url');
var grpc = require('grpc');

var proto = grpc.load('interface.proto');

var AnagramService = grpc.buildServer([proto.anagram.AnagramService.service]);

var server = new AnagramService({
    'anagram.AnagramService': {
        getAnagram: function(call, callback) {
            callback(null, getAnagram(call.request));
        }
    }
});

function getAnagram(word){

    var shuffledWord = shuffleLetters(word.word);

    var anagram = {
            question: shuffledWord,
            answer: word.word
    }

    return anagram;
}

server.bind('0.0.0.0:50051');
server.listen();

function shuffleLetters(stringToShuffle) {

        return stringToShuffle.split('').sort(function(){return 0.5-Math.random()}).join('');
}
