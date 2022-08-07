import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
import { loginUser } from "../redux/userSlice";



const LoginForm = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        const { target: { name, value } } = event;
        setUserData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async (event) => {
       event.preventDefault()
       try {
        let response = await axios.post(`http://localhost:7000/api/login`, {
            email: userData.email,
            password: userData.password
        })
        if(response.data){
            console.log(response.data)
            window.localStorage.setItem("hotelUser", JSON.stringify(response.data));
            dispatch(loginUser({
                data: response.data
            }))
            navigate('/')
            window.location.reload()
        }
       } catch (err) {
           console.log(err)
           if(err.response.status === 400)  toast(err.response.data)
       }
    }

    return (
        <form onSubmit={handleSubmit}>

            <div className="form-group mb-3">
                <label className="form-label">Email</label>
                <input
                 onChange={handleChange}
                 type="email"
                 className="form-control"
                 placeholder="Enter Email"
                 name="email" 
                 />
            </div>

            <div className="form-group mb-3">
                <label className="form-label">Password</label>
                <input
                 onChange={handleChange}
                 type="password"
                 className="form-control"
                 placeholder="Enter Password"
                 name="password" 
                 />
            </div>

            <button disabled={!userData.email || !userData.password} type="submit" className="btn btn-primary">Submit</button>
            
            <ToastContainer />

        </form>
    )
}

export default LoginForm;