import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { diffDays } from "../actions/index";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { loadStripe } from "@stripe/stripe-js";

const ViewHotel = () => {
    const [loadData, setLoadData] = useState([]);
    const [bookedHotel, setBookedHotel] = useState(false);
    const [image, setImage] = useState(""); 
    const [loading, setLoading] = useState(false)
    const { hotelId } = useParams();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        getSingleHotel();
    }, [])

    useEffect(() => {
        if(user && user.token){
            isAlreadyBooked()
        }
    }, [])

    const getSingleHotel = async () => {
        let res = await axios.get(`http://localhost:7000/api/hotel/${hotelId}`);
        setLoadData(res.data);
        setImage(`http://localhost:7000/api/hotel/image/${res.data._id}`)
    }

    const isAlreadyBooked = async () => {
        let res = await axios.get(`http://localhost:7000/api/is-already-booked/${hotelId}`, {
           headers: {
              Authorization: `Bearer ${user.token}`
           }
        })
        setBookedHotel(res.data.ok)
    }

    const getSessionId = async () => {
        setLoading(true);
        let res = await axios.post(`http://localhost:7000/api/stripe-session-id`, {
            hotelId
        }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
        stripe.redirectToCheckout({
            sessionId: res.data.sessionId
        })
        .then((result) => console.log(result))
    }

    const handleClick = (e) => {
        e.preventDefault();
        if(!user){
            navigate("/login");
            return
        }
        getSessionId()
    }

    const { title, content, price, from, to, postedBy } = loadData

    return (
       <>
        <div className="container-fluid bg-secondary p-5 text-center">
            <h2>{title}</h2>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <br />
                    <img src={image} alt={title} className="img img-fluid m-2" />
                </div>
                <div className="col-md-6">
                    <br />
                    <b>{content}</b>
                    <p className="alert alert-info mt-3">${price}</p>
                    <p className="card-text">
                        <span className="float-right text-primary">
                            for {diffDays(from, to)} {diffDays(from, to) <= 1 ? "day" : "days"}
                        </span>
                    </p>
                    <p>From <br /> {moment(new Date(from)).format("MMM Do YYYY, h:mm:ss a")}</p>
                    <p>To <br /> {moment(new Date(to)).format("MMM Do YYYY, h:mm:ss a")}</p>
                    <i>Posted By {postedBy && postedBy.name}</i>
                     <br />
                    <button onClick={handleClick} disabled={loading || bookedHotel} className="btn btn-block btn-lg btn-primary mt-3">
                         {loading ? "Loading" : bookedHotel ? "Already Booked" : user && user.token ? "Book Now" : "Login to book"}
                    </button>
                </div>
            </div>
        </div>
       </>
    )
}

export default ViewHotel;

