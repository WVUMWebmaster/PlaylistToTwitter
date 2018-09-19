let Twitter = require('twitter');
let axios = require('axios');
require('dotenv').config();

 var client = new Twitter({
     consumer_key: process.env.consumer_key,
     consumer_secret: process.env.consumer_secret,
     access_token_key: process.env.access_token_key,
     access_token_secret: process.env.access_token_secret
   });


// var client = new Twitter({
//   consumer_key: 'GSHNPB9naCol5jL2Szhb3ntPh',
//   consumer_secret: '0MEqeXnRF2KIcz3qJ9ltSduLSsUKBot3CzIABIHhfu4sQnfgML',
//   access_token_key: '87064244-vH0MB7XjlhgUrsplbIxUnSJOlKdt0jruKH7yxUwWb',
//   access_token_secret: 'LY4UShpl4AUmKOnpOq9fdjwPM83DSlrFvhth8E5ZpqLFf'
// });

var currentSong = "";
var pastSong = "";
function postToTwitter() {
  axios.get('http://cdn.voscast.com/stats/display.js?' +
    'key=35d25babae2f8cb7af0a4f9f0d7f9821&stats=songtitle&bid=5b8ec1b83a331&action=update')
    .then(function (response) {
      console.log(response.data);
      var res = new String(response.data);
      let indexStart = res.indexOf(':"');
      let indexEnd = res.indexOf("})")
      var songtitle = res.slice(indexStart + 2, indexEnd - 1);
      if (songtitle != pastSong) {
        pastSong = songtitle;
        switch (songtitle) {
          case 'Thanks for Listening to WVUM!':
            break;
          case 'Please support us at WVUM.org':
            break;
          case 'WVUM 90.5 The Voice':
            break;
          default:
            currentSong = songtitle.replace("&apos;", "'");
            currentSong = currentSong.replace("&apos;", "'");
            currentSong = currentSong.replace("&apos;", "'");
            console.log(currentSong);
            currentSong = currentSong.replace("BY", "-");
            console.log(currentSong);
            client.post('statuses/update', { status: currentSong }, function (error, tweet, response) {
              console.log(error);
              //console.log(tweet);  // Tweet body.
              //console.log(response);  // Raw response object.
            })
            break;
        }
      }

      });
}

setInterval(postToTwitter, 5000);
