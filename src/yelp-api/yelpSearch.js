
import * as api from './api';

export function yelpSearch(term, latitude, longitude) {
    var businesses = []
    // const [businesses, setBusinesses] = useState([]);
    // const [amountResults, setAmountResults] = useState();
    const searchParams = {term, latitude, longitude};

    const fetchData = async() => {
        try {
            const rawData = await api.get('/businesses/search', searchParams);
            const resp = await rawData.json();
            businesses = resp.businesses;
        } catch(e) {
            console.error(e);
        }
    };

    fetchData();

    return businesses
}