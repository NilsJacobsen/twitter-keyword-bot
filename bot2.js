// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search
require('dotenv').config();
const needle = require('needle');

let dataBuffer;

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.BEARER_TOKEN;

const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

async function getRequest() {

    // Edit query parameters below
    // specify a search query, and any additional fields that are required
    // by default, only the Tweet ID and text fields are returned
    const params = {
        'query': 'developer portfolio',
        'tweet.fields': 'created_at',
        'expansions': 'author_id',
        'user.fields': 'description'
    }

    const res = await needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${token}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}
(async () => {
  try {
    // Make request
    const response = await getRequest();
    if(dataBuffer !== response.data[0].id){
      console.log("that's new");
      console.log(response.data[0]);
      dataBuffer = response.data[0].id;
    }else{
      console.log("nothing new");
    }
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
})();
setInterval(async () => {
  try {
    // Make request
    const response = await getRequest();
    if(dataBuffer !== response.data[0].id){
      console.log("that's new");
      console.log(response.data[0]);
      dataBuffer = response.data[0].id;
    }else{
      console.log("nothing new");
    }
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
}, 600000);