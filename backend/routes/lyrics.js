
const express = require('express');
const router = express.Router();
const request = require('request');

const API_KEY = '7c80e5e7f430562b61edae8165b751d7';

function getLyrics (body) {
  let lyrics;
  try {
    lyrics = JSON.parse(body).message.body.lyrics.lyrics_body;
  } catch (e) {
    lyrics = '';
  }
  return {
    lyrics: lyrics.replace(`\n...\n\n******* This Lyrics is NOT for Commercial use *******`, '').trim()
  };
}

function getResults (body) {
  const track_list = JSON.parse(body).message.body.track_list

  return track_list.map((el) => {
    const {
      track: {
        track_id: trackId,
        track_name: songName,
        artist_name: artistName,
      }
    } = el;

    return {
      trackId,
      songName,
      artistName,
    }
  });
}

router.get('/', function (req, res, next) {
  res.send('set of lyrics api');
});

router.get('/get/:trackId', function (req, res, next) {
  const { trackId } = req.params

  var options = {
    method: 'GET',
    url: 'http://api.musixmatch.com/ws/1.1/track.lyrics.get',
    qs: {
      track_id: trackId,
      apikey: '7c80e5e7f430562b61edae8165b751d7'
    }
  };

  request(options, function (error, response, body) {
    if (error) {
      console.log(error);
      res.send({ error: true, erorObj: error });
    }

    res.send(getLyrics(body));
  });
})

router.get('/search', (req, res, next) => {
  const {
    q,
    page = 1
  } = req.query;

  var options = {
    method: 'GET',
    url: 'http://api.musixmatch.com/ws/1.1/track.search',
    qs: {
      q,
      s_track_rating: 'desc',
      apikey: API_KEY,
      page_size: '10',
      page
    }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    res.send(getResults(body));
  });  

});

module.exports = router;
