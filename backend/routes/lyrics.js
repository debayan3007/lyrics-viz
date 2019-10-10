
const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');

function parsePageAZ (body) {
  const $ = cheerio.load(body)

  let containerDiv = $('.container').toArray()
  containerDiv = $($(containerDiv[2]).children().toArray())
  containerDiv = $(containerDiv[0]).children().toArray()
  containerDiv = $(containerDiv[1]).children().toArray()
  const artistDivText = $(containerDiv[2]).text().trim()
  const songDivText = $(containerDiv[4]).text()

  const artistName = artistDivText.substring(0, artistDivText.length-7)
  const songName = songDivText.substring(1, songDivText.length - 1)
  const lyrics = $(containerDiv[7]).text().trim()//.replace(/\s+/gim, ' ')

  return {
    artistName,
    songName,
    lyrics,
  }
}

function parseSearchResults (body) {
  const $ = cheerio.load(body)

  let searchResult = $($(body).find('table').toArray()[0]).children().toArray()[0]
  searchResult = $(searchResult).children().toArray()

  const results = searchResult.map((item, i) => {
    const songLink = $(item).find('a').attr('href')
    const songName = $(item).find('a').text()
    const artistName = $($(item).find('b').toArray()[1]).text()
    return {
      songLink,
      songName,
      artistName,
    }
  });

  return results.slice(1, results.length-1)
}

router.get('/', function (req, res, next) {
  res.send('set of lyrics api');
});

router.post('/az', function (req, res, next) {
  const { url } = req.body

  console.log('received request --> ', url)

  var options = {
    method: 'GET',
    url,
  };

  console.log('option')

  request(options, function (error, response, body) {
    if (error) {
      console.log(error);
      res.send({ error: true, erorObj: error });
    }

    res.send(parsePageAZ(body));
  });
})

router.get('/search', (req, res, next) => {
  const {
    q,
    page
  } = req.query;

  var options = {
    method: 'GET',
    url: 'https://search.azlyrics.com/search.php',
    qs: {
      q,
      w: 'songs',
      p: page,
    }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    res.send(parseSearchResults(body));
  });  

});

module.exports = router;
