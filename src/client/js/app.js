function performAction(e){
    const city = document.getElementById('city').value;
    let inputDate = document.getElementById('inputDate').value;
    const startDate = changeFormat(inputDate);
    const endDate = document.getElementById('endDate').value;
    const daysUntilTrip = daysInFuture(startDate);
    const tripLength = daysBetween(startDate, endDate);
    const url = `http://localhost:3000/get?city=${city}&daysUntilTrip=${daysUntilTrip}`
    const encodedUrl = encodeURI(url);
    getData(encodedUrl)
    .then(
        function(response) {
            document.getElementById('location').innerHTML = `Location: ${response.cityName}, ${response.stateCode} ${response.countryCode}`;
            document.getElementById('date').innerHTML = `Date of Departure: ${startDate}`;
            document.getElementById('countdown').innerHTML = `Days until Trip: ${daysUntilTrip}`;
            document.getElementById('tripLength').innerHTML = `Trip Length: ${tripLength} days`
            document.getElementById('weather').innerHTML = `Temperature High: ${celsiusToFahrenheit(response.highTemp)} Temperature Low: ${celsiusToFahrenheit(response.lowTemp)}`;
            let image = document.createElement("img");
            image.src = response.imageURL;
            image.height = 300;
            image.width = 300;
            const pic = document.getElementById('picture');
            if (pic.children.length > 0) {
                pic.removeChild(pic.lastChild);
            }
            pic.appendChild(image);
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


function daysBetween(startDate, endDate) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let diffMillis = end.getTime() - start.getTime();
    let diffDays = Math.ceil(diffMillis/(1000 * 60 * 60 * 24));
    return diffDays;
}


function changeFormat(inputDate) {
    const date = new Date(inputDate);
    let day = date.getDate() + 1;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (day < 10) {
        day = `0${day}`
    }
    if (month < 10) {
        month = `0${month}`
    }
    const newFormat = `${month}-${day}-${year}`
    return newFormat
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


export { performAction, daysBetween }
