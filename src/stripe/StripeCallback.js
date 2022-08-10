import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { loginUser } from "../redux/userSlice";

const StripeCallback = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
      if(user && user.token){
        getAccountStatus() 
      }
    }, [user])
    const getAccountStatus = async () => {
        let response = await axios.post(`http://localhost:7000/api/get-account-status`, {}, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        if(window.localStorage.getItem("hotelUser")){
            let hotelUser = JSON.parse(localStorage.getItem("hotelUser"))
            hotelUser.user = user
            localStorage.setItem("hotelUser", JSON.stringify(response.data))
        }
        dispatch(loginUser({
            data: response.data
        }))
        window.location.href = "/dashboard/seller"
        window.location.reload()
    }
    return (
        <div className="d-flex justify-content-center">
            <LoadingOutlined className="h1 p-5 text-danger" />
        </div>
    )
}

export default StripeCallback;