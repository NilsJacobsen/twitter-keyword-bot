require('dotenv').config();
var Twit = require('twit')

var Twitter = new Twit({
  consumer_key:         process.env.API_KEY,
  consumer_secret:      process.env.API_KEY_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000, 
  strictSSL:            true, 
})

var retweet = function() {
  var params = {
      q: '#nodejs, #Nodejs',  // REQUIRED
      result_type: 'recent',
      lang: 'en'
  }
  // for more parameters, see: https://dev.twitter.com/rest/reference/get/search/tweets

  Twitter.get('search/tweets', params, function(err, data) {
    // if there no errors
    console.log(err, data);
      if (!err) {
        // grab ID of tweet to retweet
          var retweetId = data.statuses[0].id_str;
          // Tell TWITTER to retweet
          console.log(data.statuses[0]);
          // Twitter.post('statuses/retweet/:id', {
          //     id: retweetId
          // }, function(err, response) {
          //     if (response) {
          //         console.log('Retweeted!!!');
          //     }
          //     // if there was an error while tweeting
          //     if (err) {
          //         console.log('Something went wrong while RETWEETING... Duplication maybe...');
          //     }
          // });
      }
      // if unable to Search a tweet
      else {
        console.log('Something went wrong while SEARCHING...');
      }
  });
}

retweet();