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

// GET route
app.get('/get', sendData);

function sendData (request, response) {
  console.log("sendData called")
  response.send(projectData);
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