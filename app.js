
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");



const app = express();

app.use(bodyParser.urlencoded({extended: true}));


// localhost:3000 can be represented with /
app.get("/", function(req, res) {
    
    // send index.html in response
    res.sendFile(__dirname + "/index.html");
});



app.post("/", function(req, res) {
    
    const query = req.body.cityName;
    const apiKey = "af4d4a32cc4e352a486a90291745ac13";
    const metric = "metric";

    // Save the url or endpoint in a variable
    const url =  "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + metric;
 
    // Make a request to server
    https.get(url, function(response) {
    //   console.log(response.statusCode);
    
    // get the actual data
    response.on("data", function(data) {
        // Data is in hexadecimal format
       
        // Convert this into Json object
        const weatherData = JSON.parse(data);
        
        const desc = weatherData.weather[0].description;
        const temp = weatherData.main.temp;
        

        res.write("The weather in " + query +  " is " + desc);
        res.write(". The temperature in " + query +  " is " + temp + "  Celsius Degree.");

        res.send();
    });

});

});




app.listen(3000, function() {
    console.log("Server is running on port 3000.");
});