import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';


const RegisterForm = () => {
    let navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (event) => {
        const { target: { name, value } } = event;
        setUserData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async (event) => {
       event.preventDefault()
       try {
        let response = await axios.post(`http://localhost:7000/api/register`, {
            name: userData.username,
            email: userData.email,
            password: userData.password,
            confirmPassword: userData.confirmPassword
        })
          toast("Registeration Successful")
          navigate('/login')
       } catch (err) {
           console.log(err)
           if(err.response.status === 400)  toast(err.response.data)
       }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label className="form-label">Your Username</label>
                <input
                onChange ={handleChange}
                 type="text"
                 className="form-control"
                 placeholder="Enter Name"
                 name="username" 
                 />
            </div>

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

            <div className="form-group mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                 onChange={handleChange}
                 type="password"
                 className="form-control"
                 placeholder="Confirm Password"
                 name="confirmPassword" 
                 />
            </div>

            <button disabled={!userData.username || userData.email || userData.password || userData.confirmPassword} type="submit" className="btn btn-primary">Submit</button>
            
            <ToastContainer />


        </form>
    )
}

export default RegisterForm;