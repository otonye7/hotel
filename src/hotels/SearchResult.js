import { useState, useEffect } from "react";
import queryString from "query-string";
import SmallCard from "../component/Cards/SmallCards";
import { Link } from "react-router-dom";
import Search  from "../component/search/SearchForm";
import axios from "axios";

const SearchResult = () => {
    const [searchLocation, setSearchLocation] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [searchBed, setSearchBed] = useState("");
    const [hotels, setHotels] = useState([]);

//when component mounts get search params from url and use to send to backend
    useEffect(() => {
        SearchListing()
    }, [window.location.search])

    const SearchListing = async () => {
        const { location, date, bed } = queryString.parse(window.location.search);
        const res = await axios.post(`http://localhost:7000/api/search-listing`, {
            location,
            date,
            bed
        })
        setHotels(res.data)
    }

    return (
       <>
       <div className="col">
          <br />
          <Search />
       </div>
        <div className="container">
            <div className="row">
                {
                    hotels.map((hotels) => <SmallCard key={hotels._id} hotels={hotels} />)
                }
            </div>
        </div>
       </>
    )
}

export default SearchResult