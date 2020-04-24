function performAction(e){
    const city = document.getElementById('city').value;
    const date = document.getElementById('inputDate').value;
    const daysUntilTrip = daysInFuture(date);
    const url = `http://localhost:3000/get?city=${city}&daysUntilTrip=${daysUntilTrip}`
    const encodedUrl = encodeURI(url);
    getData(encodedUrl)
    .then(
        function(response) {
            console.log(response);
            document.getElementById('location').innerHTML = `Location: ${response.cityName}, ${response.stateCode} ${response.countryCode}`;
            document.getElementById('date').innerHTML = `Date of Departure: ${date}`;
            document.getElementById('countdown').innerHTML = `Days until Trip: ${daysUntilTrip}`
            document.getElementById('weather').innerHTML = `Temperature High: ${celsiusToFahrenheit(response.highTemp)} Temperature Low: ${celsiusToFahrenheit(response.lowTemp)}`;
            let image = document.createElement("img");
            image.src = response.imageURL;
            image.height = 100;
            image.width = 100;
            document.getElementById('picture').appendChild(image);
        }
    )
}


function daysInFuture(date) {
    let start = new Date(date);
    let now = new Date();
    let diffMillis = start.getTime() - now.getTime();
    let diffDays = Math.ceil(diffMillis/(1000 * 60 * 60 * 24));
    return diffDays;
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
