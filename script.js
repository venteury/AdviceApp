const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {

  // API Call
  const url = "https://api.adviceslip.com/advice";

  https.get(url, function (response) {
    response.on("data", function (data) {
      const advices = JSON.parse(data);
      const adv = advices.slip.advice;
      res.render("index",{ qot: adv });
      console.log(adv);
    });
  });

});

app.listen(3000, function () {
  console.log("Server is active now!");
});



