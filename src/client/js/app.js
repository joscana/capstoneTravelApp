function performAction(e){
    const city = document.getElementById('city').value;
    const date = document.getElementById('inputDate').value;
    const url = `http://localhost:3000/get?city=${city}`
    const encodedUrl = encodeURI(url);
    getData(encodedUrl)
    .then(
        function(response) {
            console.log(response);
            document.getElementById('location').innerHTML = `Location: ${response.cityName}, ${response.stateCode} ${response.countryCode}`;
            document.getElementById('date').innerHTML = `Date of Departure: ${date}`;
            document.getElementById('weather').innerHTML = `Temperature High: ${celsiusToFahrenheit(response.highTemp)} Temperature Low: ${celsiusToFahrenheit(response.lowTemp)}`;
        }
    )
}


function daysInFuture() {
    let str = document.getElementById('inputDate');
    let start = new Date(str);
    let now = new Date();
    let diffMillis = start.getTime() - now.getTime();
    let diffDays = Math.floor(diffMillis/(1000 * 60 * 60 * 24));
}


function celsiusToFahrenheit(celsius) {
    let f = celsius * 9 / 5 + 32;
    return f;
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
