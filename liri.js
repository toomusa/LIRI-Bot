require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
moment().format();
var Spotify = require('node-spotify-api');

let action = process.argv[2];
let search = process.argv.slice(3).join(" ");

var spotify = new Spotify({
    id: keys.SPOTIFY_ID,
    secret: keys.SPOTIFY_SECRET
});

const findSpotify = async () => {
    let songName = search;
    await spotify.search({ type: 'track', query: songName }, function(e, data) {
    if (e) {
      return console.log(e);
    }
    console.log("\x1b[1m", "\x1b[33m", `Artist: ${data.tracks.items[0].album.artists[0].name}`)
    console.log("\x1b[1m", "\x1b[33m", `Song: ${data.tracks.items[0].name}`)
    console.log("\x1b[1m", "\x1b[33m", `Album: ${data.tracks.items[0].album.name}`)
    console.log("\x1b[1m", "\x1b[33m", `Preview Link: ${data.tracks.items[0].preview_url}`)
    });
}

const findMovie = async () => {
    let movieName = search;
    let queryURL = `http://www.omdbapi.com/?t=${movieName}&plot=short&apikey=6fc8116c`;
    try {
        let response = await axios.get(queryURL);
        console.log("\x1b[1m", "\x1b[36m", `Title: ${response.data.Title}`)
        console.log("\x1b[1m", "\x1b[36m", `Plot: ${response.data.Plot}`)
        console.log("\x1b[1m", "\x1b[36m", `Actors: ${response.data.Actors}`)
        console.log("\x1b[1m", "\x1b[36m", `IMDB Rating: ${response.data.imdbRating}`)
        console.log("\x1b[1m", "\x1b[36m", `Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`)
        console.log("\x1b[1m", "\x1b[36m", `Release Date: ${response.data.Released}`)
        console.log("\x1b[1m", "\x1b[36m", `Country of Origin: ${response.data.Country}`)
        console.log("\x1b[1m", "\x1b[36m", `Language: ${response.data.Language}`)
    } catch (e) {
        return console.log(e);
    }
}

const findBand = async () => {
    let bandName = search;
    let queryURL = `https://rest.bandsintown.com/artists/${bandName}?app_id=codingbootcamp`;
    let qURL = `https://rest.bandsintown.com/artists/${bandName}/events?app_id=codingbootcamp`;
    try {
        let response = await axios.get(queryURL);
        // console.log(response.data);
        let responseInfo = await axios.get(qURL);
        // console.log(responseInfo.data);
        // let formattedDate = responseInfo.data[0].datetime
        let $formattedDate = moment(responseInfo.data[0].datetime).format("dddd, MMMM DD, YYYY, [at] hh:MM A");
        console.log("\x1b[1m", "\x1b[35m", `Artist Name: ${response.data.name}`)
        console.log("\x1b[1m", "\x1b[35m", `Venue: ${responseInfo.data[0].venue.name}`)
        console.log("\x1b[1m", "\x1b[35m", `Date: ${$formattedDate}`)
    } catch (e) {
        return console.log(e);
    }
}

const findRandom = () => {
    fs.readFile("random.txt", "utf8", function(e, data){
        if (e) {
            return console.log(e);
        }
        const command = data.split(",");
        action = command[0];
        search = command[1];
        obey();
    })
}

const obey = () => {
    switch(action) {
        case 'concert-this':
        findBand();
        break;
        case 'spotify-this-song':
        findSpotify();
        break;
        case 'movie-this':
        findMovie();
        break;
        case 'do-what-it-says':
        findRandom();
        break;
    }
}

obey();