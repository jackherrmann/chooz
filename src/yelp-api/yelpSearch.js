
const api = require('./api');

async function yelpSearch(term, latitude, longitude) {
    var businesses = [];
    const searchParams = {
        'term' : term, 
        'latitude' : latitude, 
        'longitude' : longitude
    };
    console.log(searchParams)
    try {
        const rawData = await api.get('/businesses/search', searchParams);
        const resp = await rawData.json();
        // console.log(resp.businesses[0])
        console.log("FIRST")
        return resp.businesses;
        
    } catch(e) {
        console.error(e);
    }
}

module.exports = { yelpSearch };