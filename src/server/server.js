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
const weatherbitBaseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?postal_code=';


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
          const geonamesPostalCode = geoResponse.postalCodes[0].postalCode;
          console.log(geoResponse);
          console.log(geonamesPostalCode);


          const weatherbitURL = `${weatherbitBaseURL}${geonamesPostalCode}&key=${process.env.WEATHERBIT_API_KEY}`;
          console.log(weatherbitURL)
          return getData(weatherbitURL)

      //     const feelings = document.getElementById('feelings').value;
      //     return postData('/addForecast', {temperature: weather.main.temp, date: newDate, user_response: feelings})
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
      console.log(newData);
      return newData;
  }catch(error) {
      console.log("error", error);
  }
};