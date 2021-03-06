const dotenv = require('dotenv');
dotenv.config();
const path = require('path')

/* Empty JS object to act as endpoint for all routes */
const projectData = {};

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
const weatherbitDailyBaseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const pixabayBaseURL = 'https://pixabay.com/api/?'


// GET route
app.get('/get', getWeather);

function getWeather (request, response) {
  const city = request.query.city;
  const daysUntilTrip = request.query.daysUntilTrip;
  const url = `${geonamesBaseURL}&placename=${city}`;
  const encodedUrl = encodeURI(url);
  getData(encodedUrl)
  .then(
      function(geoResponse) {
          const longitude = geoResponse.postalCodes[0].lng;
          const latitude = geoResponse.postalCodes[0].lat;
          
          //Hard-coded lat & long for testing when Geonames API is unresponsive
          //const latitude = 26.3683;
          //const longitude = -80;
          
          const weatherbitURL = `${weatherbitDailyBaseURL}lat=${latitude}&lon=${longitude}&key=${process.env.WEATHERBIT_API_KEY}`;
          return getData(weatherbitURL)
      }
  )
  .then(
    function(weatherbitResponse) {
      let index = getIndexForDay(daysUntilTrip, weatherbitResponse.data.length);

      const highTemp = weatherbitResponse.data[index].high_temp;
      const lowTemp = weatherbitResponse.data[index].low_temp;
      const cityName = weatherbitResponse.city_name;
      const stateCode = weatherbitResponse.state_code;
      const countryCode = weatherbitResponse.country_code;
      const forecastDate = weatherbitResponse.data[index].datetime;
      projectData.highTemp = highTemp;
      projectData.lowTemp = lowTemp;
      projectData.cityName = cityName;
      projectData.stateCode = stateCode;
      projectData.countryCode = countryCode;
      projectData.forecastDate = forecastDate;
      
      const pixabayURL = encodeURI(`${pixabayBaseURL}key=${process.env.PIXABAY_API_KEY}&q=${city}`);
      return getData(pixabayURL)

    }
)
.then (
  function(pixabayResponse) {
    projectData.imageURL = pixabayResponse.hits[0].webformatURL;
    response.send(projectData)
  }
)
};


function getIndexForDay(daysUntilTrip, dataLength) {
  if (daysUntilTrip >= dataLength) {
    return dataLength - 1;
  } else {
    return daysUntilTrip;
  }
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


module.exports = { getIndexForDay }
