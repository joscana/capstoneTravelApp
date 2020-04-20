/*Global Variables*/
const geonamesBaseURL = '';

document.getElementById('generate').addEventListener('click', performAction);


function performAction(e){
    const cityZipCode = document.getElementById('zip').value;
    getData(baseURL+cityZipCode+countryCode+apiKey+fahrenheit)
    .then(
        function(weather) {
            const feelings = document.getElementById('feelings').value;
            return postData('/addForecast', {temperature: weather.main.temp, date: newDate, user_response: feelings})
        }
    )
    .then(
        function(post_response) {
            return getData('/get')
        }
    )
    .then(
        function(get_response) {
            document.getElementById('date').innerHTML = get_response.date;
            document.getElementById('temp').innerHTML = get_response.temperature;
            document.getElementById('content').innerHTML = get_response.user_response;
        }
    )
}


const postData = async (url = '', data = {})=>{
    // console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
    }
};


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