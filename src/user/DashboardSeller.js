import { useState, useEffect } from "react";
import DashboardNav from "../component/DashboardNav";
import ConnectNav from "../component/ConnectNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import axios from "axios";
import SmallCard from "../component/Cards/SmallCards";
import { ToastContainer, toast } from 'react-toastify';

const DashBoardSeller = () => {
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false)
    const [sellerData, setSellerData] = useState([]);
    const handleClick = async () => {
      setLoading(true)
      try {
        let response = await axios.post(`http://localhost:7000/api/create-connect-account`, {}, {
          headers: {
            Authorization: `Bearer ${user.token}`//get login link for stripe
          }
        })
        window.location.href = response.data
      } catch (err) {
        console.log(err)
        toast.error("Stripe connect failed, Try again.")
        setLoading(false)
      }
    }

    useEffect(() => {
      loadSellersHotels()
    }, [])

    const loadSellersHotels = async () => {
      const res = await axios.get(`http://localhost:7000/api/seller-hotels`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      setSellerData(res.data)
    }

    const connected = () => {
      return (
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h2>Your Hotels</h2>
          </div>
          <div className="col-md-2">
            <Link className="btn btn-primary" to="/hotels/new">+ Add New</Link>
          </div>
        </div>

        <div className="row">
          {
            sellerData.map((hotels) => <SmallCard key={hotels._id} hotels={hotels} showViewMoreButton={false} owner={true} />)
          }
        </div>
      </div>
      )
    }
    const notConnected = () => {
      return (
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="p-5 pointer">
              <HomeOutlined className="h1" />
              <h4>Setup payouts to post hotel rooms</h4>
              <p className="lead">
                Mern partner with stripe to transfer earnings
                to your bank account
              </p>
              <button disabled={loading} onClick={handleClick} className="btn btn-primary mb-3">
                {loading ? "Processing" : "Setup Payout"}
              </button>
              <p className="text-muted">
                <small>You will be redirected to Stripe to complete the onboarding process</small>
              </p>
            </div>
          </div>
        </div>
      </div>
      )
    }
    return (
        <>
          <div className="container-fluid bg-secondary p-5">
            <ConnectNav />
          </div>
          <div className="container-fluid p-4">
            <DashboardNav />
          </div>
          <ToastContainer />
        { user &&
          user.user && 
          user.user.stripe_seller &&
          user.user.stripe_seller.charges_enabled
          ? connected() : notConnected()
        }
        </>
    )
}
export default DashBoardSeller;