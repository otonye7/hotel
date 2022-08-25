import { useState, useEffect } from "react";
import DashboardNav from "../component/DashboardNav";
import ConnectNav from "../component/ConnectNav";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import BookingCard from "../component/Cards/BookingCards";

const DashBoard = () => {
  const [bookHotelData, setBookedHotelData] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getBookedHotel()
  }, [])

  const getBookedHotel = async () => {
      let res = await axios.get(`http://localhost:7000/api/user-hotel-bookings`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      setBookedHotelData(res.data)
    }

    return (
        <>
          <div className="container-fluid bg-secondary p-5">
              <ConnectNav />
          </div>
          <div className="container-fluid p-4">
            <DashboardNav />
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-10">
                <h2>Your Bookings</h2>
              </div>
              <div className="col-md-2">
                <Link className="btn btn-primary" to="/">Browse Hotels</Link>
              </div>
            </div>
          </div>
          <div className="row">
            {
              bookHotelData.map((hotels) => (
                <BookingCard 
                key={hotels._id}
                hotels={hotels}
                session={hotels.session}
                orderedBy={hotels.orderedBy}
                />
              ))
            }
          </div>
        </>
    )
}
export default DashBoard;