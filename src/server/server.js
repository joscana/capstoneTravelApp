const dotenv = require('dotenv');
dotenv.config();
const path = require('path')

/* Empty JS object to act as endpoint for all routes */
const projectData = [];

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

const fetch = require('node-fetch');

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('dist'));

const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
 function listening(){
    console.log(`running on localhost: ${port}`);
  };

/*Home route uses the index file from dist*/
app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})


/*Global Variables*/
const geonamesBaseURL = 'http://api.geonames.org/postalCodeSearchJSON?maxRows=1&username=joscana';
const weatherbitBaseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';


// GET route
app.get('/get', getWeather);

function getWeather (request, response) {
  const city = request.query.city;
  console.log(`City: ${city}`);


  const url = `${geonamesBaseURL}&placename=${city}`;
  const encodedUrl = encodeURI(url);
  getData(encodedUrl)
  .then(
      function(geoResponse) {
          const longitude = geoResponse.postalCodes[0].lng;
          const latitude = geoResponse.postalCodes[0].lat;
          console.log(`Latitude = ${latitude} Longitude = ${longitude}`)
          // console.log(geoResponse);
          // console.log(geonamesPostalCode);

          const weatherbitURL = `${weatherbitBaseURL}lat=${latitude}&lon=${longitude}&key=${process.env.WEATHERBIT_API_KEY}`;
          console.log(weatherbitURL)
          return getData(weatherbitURL)
      }
  )
  .then(
    function(weatherbitResponse) {
      //console.log(weatherbitResponse);
        // const geonamesPostalCode = geoResponse.postalCodes[0].postalCode;
        // console.log(geoResponse);
        // console.log(geonamesPostalCode);

        // const weatherbitURL = `${weatherbitBaseURL}${geonamesPostalCode}&key=${process.env.WEATHERBIT_API_KEY}`;
        // console.log(weatherbitURL)
        // return getData(weatherbitURL)

      response.send(weatherbitResponse)
    }
)
};


app.post('/addForecast', addForecast);

function addForecast (request, response){
    const body = request.body;
    projectData.temperature = body.temperature;
    projectData.date = body.date;
    projectData.user_response = body.user_response;
    console.log(projectData);
    const jsonData = JSON.parse('{"response": "POST received"}');
    response.send(jsonData);
}

const getData = async (url = '')=>{
  const response = await fetch(url);

  try {
      const newData = await response.json();
      return newData;
  }catch(error) {
      console.log("error", error);
  }
};