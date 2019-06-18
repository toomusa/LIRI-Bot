require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

// COMMANDS
// concert-this  // Bands in Town
// spotify-this-song  // Spotify
// movie-this  // OMDB
// do-what-it-says  //  random.txt