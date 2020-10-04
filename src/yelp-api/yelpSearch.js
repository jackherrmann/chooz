import {useState, useEffect} from 'react';
import * as api from './api';

export function yelpSearch(term, latitude, longitude) {
    const [businesses, setBusinesses] = useState([]);
    const [amountResults, setAmountResults] = useState();
    const [searchParams, setSearchParams] = useState({term, latitude, longitude});

    useEffect(() => {
        setBusinesses([]);
        const fetchData = async() => {
            try {
                const rawData = await api.get('/businesses/search', searchParams);
                const resp = await rawData.json();
                setBusinesses(resp.businesses);
                setAmountResults(resp.total);
            } catch(e) {
                console.error(e);
            }
        };
        fetchData();
        
    }, [searchParams]);

    return [businesses, amountResults, searchParams, setSearchParams]
}