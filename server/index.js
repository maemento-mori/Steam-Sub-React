// server/index.js

const express = require('express')
const app = express()

const cheerio = require("cheerio")
const axios = require("axios")

// const port = 3000
const PORT = process.env.PORT || 3001;



app.get('/testFetch', (req, res) => {
  async function getProfileData() {
    console.log("starting");
    const axiosResponse = await axios.request({
      method: "GET",
      url: "https://steamcommunity.com/sharedfiles/filedetails/?id=2986581203",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      },
    });
    const $ = cheerio.load(axiosResponse.data);

    let subscribers = $(".stats_table").find("tr:nth-child(2)").find("td:first-child").text()

    return subscribers
  }

  async function init() {
    let userData = await getProfileData();
    console.log("finished fetching data")

    res.send({ message: userData })
  }

  init()
})

// Defining an Endpoint
app.get('/search/:name', function (req, res) {
  console.log(req.params['name']);
  let userNameID = req.params['name'];
  let userNameLink = "https://steamcommunity.com/id/"+userNameID+"/myworkshopfiles/?p=1&numperpage=30"
  
  async function getProfileData() {
    console.log("starting...");
    const axiosResponse = await axios.request({
      method: "GET",
      url: userNameLink,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      },
    });
    const $ = cheerio.load(axiosResponse.data);

    let userNameText = $("#HeaderUserInfoName").find("a").text();
    let followersNumber = $(".followStat").text();

    let userData = {
      userName: userNameText,
      followers: followersNumber
    }

    return userData
  }

  async function init() {
    let userData = await getProfileData();
    console.log(userData)
    res.send(userData);
  }

  init()

  // res.send(req.params['name']);
});







app.get('/test', (req, res) => {
  res.send({ message: "Hello from server!" })
  
})

app.get('/', (req, res) => {
  fetch('https://steamcommunity.com/sharedfiles/filedetails/?id=2986581203')
    .then(resp=> resp.text()).then(body => res.send(body)) ; 
  
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

