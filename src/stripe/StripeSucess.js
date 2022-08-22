import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from 'react-router';
import { LoadingOutlined } from "@ant-design/icons";

const StripeSuccess = () => {
    const { hotelId } = useParams();
    let navigate = useNavigate();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        stripeSuccessRequest();
    }, [hotelId])

    const stripeSuccessRequest = async () => {
        const res = await axios.post(`http://localhost:7000/api/stripe-success`, {
            hotelId
        }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        console.log(res)
        if(res.data){
            navigate("/dashboard")
         } else {
            navigate("/stripe/cancel")
         }
    }

    return (
        <div className="container">
            <div className="col">
                <h2 className="text-center p-5"><LoadingOutlined className="displsy-1 text-danger" /></h2>
            </div>
        </div>
    )
}
export default StripeSuccess;

