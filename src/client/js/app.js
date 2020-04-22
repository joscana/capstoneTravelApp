function performAction(e){
    const city = document.getElementById('city').value;
    const url = `http://localhost:3000/get?city=${city}`
    const encodedUrl = encodeURI(url);
    getData(encodedUrl)
    .then(
        function(geoResponse) {
            console.log(geoResponse);
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
