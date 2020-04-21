//document.getElementById('generate').addEventListener('click', performAction);


function performAction(e){
    const city = document.getElementById('city').value;
    // const url = `${geonamesBaseURL}&placename=${city}`;
    const url = `http://localhost:3000/get?city=${city}`
    const encodedUrl = encodeURI(url);
    getData(encodedUrl)
    .then(
        function(geoResponse) {
            // const geonamesPostalCode = geoResponse.postalCodes[0].postalCode;
            // console.log(geoResponse);
            // console.log(geonamesPostalCode);


            // const weatherbitURL = `${weatherbitBaseURL}${geonamesPostalCode}&key=${process.env.WEATHERBIT_API_KEY}`;
            // console.log(weatherbitURL)
            // return getData(weatherbitURL)

        //     const feelings = document.getElementById('feelings').value;
        //     return postData('/addForecast', {temperature: weather.main.temp, date: newDate, user_response: feelings})
        }
    )
   /* .then(
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
    )*/
}


// const postData = async (url = '', data = {})=>{
//     // console.log(data);
//     const response = await fetch(url, {
//         method: 'POST',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     });

//     try {
//         const newData = await response.json();
//         console.log(newData);
//         return newData;
//     }catch(error) {
//         console.log("error", error);
//     }
// };


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
