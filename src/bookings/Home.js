import axios from "axios";
import { useState, useEffect } from 'react';
import SmallCard from "../component/Cards/SmallCards";
import Search from "../component/search/SearchForm";

const Home = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        let response = await axios.get(`http://localhost:7000/api/hotels`);
        setData(response.data)
    }
    return (
       <>
        <div className="container-fluid h1 p-5 text-center">
           <h1>ALL HOTELS</h1>
        </div>
        <div className="col">
        <br />
        <Search />
       </div>
        <div className="container-fluid">
            <br />
            {
                data.map((hotels) => {
                    return (
                        <SmallCard
                         key={hotels._id}
                         hotels={hotels}
                         />
                    )
                })
            }
        </div>
       </>
    )
}

export default Home;