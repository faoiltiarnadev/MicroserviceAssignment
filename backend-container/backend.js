var url = require('url');
var grpc = require('grpc');

var anagramProto = grpc.load('anagramInterface.proto');

var server = new grpc.Server();

server.addProtoService(anagramProto.anagram.AnagramService.service, {
    getAnagram: function(call, callback) {
        callback(null, getAnagram(call.request));
    }
});

server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure);
server.start();

function getAnagram(word){

    var shuffledWord = shuffleLetters(word.word);

    var anagram = {
            question: shuffledWord,
            answer: word.word
    }

    return anagram;
}

function shuffleLetters(stringToShuffle) {

        return stringToShuffle.split('').sort(function(){return 0.5-Math.random()}).join('');
}
