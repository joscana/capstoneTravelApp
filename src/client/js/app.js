function performAction(e){
    const city = document.getElementById('city').value;
    const url = `http://localhost:3000/get?city=${city}`
    const encodedUrl = encodeURI(url);
    getData(encodedUrl)
    .then(
        function(response) {
            console.log(response);
            document.getElementById('location').innerHTML = `Location: ${response.cityName}, ${response.stateCode} ${response.countryCode}`;
            document.getElementById('date').innerHTML = `Date of Departure: ${response.forecastDate}`;
            document.getElementById('weather').innerHTML = `Temperature High: ${response.highTemp} Temperature Low: ${response.lowTemp}`;
        }
    )
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


export { performAction }
