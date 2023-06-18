//jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){
    console.log(req.body.cityName); 
    //for receiving the cityName
    const query = req.body.cityName;
    const apiKey = "ad28863c5ee275254ea3acec1dc22082";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey;
    https.get(url, function(response){
        // console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;

            res.write("<p>The weather is currently "+ weatherDescription+"</p>");
            res.write("<h1>The temperature in "+query+" is "+temp+" kelvin</h1>");
            // We can change the temp to celsius else it is in kelvin
            
            // We can also get images from openweatherAPI
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<img src="+imageURL+">");
            
            res.send();
        });
    });
})

app.listen(3000, function(){
    console.log("Server started on port: 3000");
});