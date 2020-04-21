/*Global Variables*/
const geonamesBaseURL = 'http://api.geonames.org/postalCodeSearchJSON?maxRows=1&username=joscana';


//document.getElementById('generate').addEventListener('click', performAction);


function performAction(e){
    const city = document.getElementById('city').value;
    const url = `${geonamesBaseURL}&placename=${city}`;
    const encodedUrl = encodeURI(url);
    console.log(encodedUrl);
    getData(encodedUrl)
    .then(
        function(geoResponse) {
            console.log(geoResponse);

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
