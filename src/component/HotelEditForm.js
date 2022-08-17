import { useState, useEffect } from "react";
import { DatePicker, Select } from "antd";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const { Option } = Select

const HotelEditForm = () => {

    const user = useSelector((state) => state.user);
    const [values, setValues] = useState({
        title: "",
        content: "",
        location: "",
        price: "",
        from: "",
        to: "",
        bed: ""
    })
    const [image, setImage] = useState("");
    const { title, content, location, price, from, to, bed } = values;
    const { hotelId } = useParams();
    
    useEffect(() => {
        getSingleHotels()
    }, []);

    const getSingleHotels = async () => {
        let res = await axios.get(`http://localhost:7000/api/hotel/${hotelId}`)
        setValues({ ...values, ...res.data })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let hotelData = new FormData();
        hotelData.append("title", title)
        hotelData.append("content", content)
        hotelData.append("location", location)
        hotelData.append("price", price)
        image && hotelData.append("image", image)
        hotelData.append("from", from)
        hotelData.append("to", to)
        hotelData.append("bed", bed)
        try {
            let response = await axios.put(`http://localhost:7000/api/update-hotel/${hotelId}`, hotelData , {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            toast("Hotel has been successfully updated");
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } catch (err) {
            if(err.response.status === 400)  toast(err.response.data)
        }
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    }

    const handleChange = (e) => {
        const { target: { value, name } } = e
        setValues(prevValues => ({ ...prevValues, [name]: value }))
    }



    return (
        <form className="form-group" onSubmit={handleSubmit}>
            <label className="btn btn-outline-secondary btn-block m-2 text-left">
                Image
                <input
                 type="file"
                 name="image"
                 onChange={handleImageChange}
                 accept="image/*"
                 hidden 
                />
            </label>

            <input 
             type="text"
             name="title"
             onChange={handleChange}
             placeholder="Title"
             className="form-control m-2"
             value={title}
            />

            <textarea
             name="content"
             onChange={handleChange}
             placeholder="Content"
             className="form-control m-2"
             value={content}
            />

            <input 
             type="text"
             name="location"
             onChange={handleChange}
             placeholder="Location"
             className="form-control m-2"
             value={location}
            />   

            <input 
             type="number"
             name="price"
             onChange={handleChange}
             placeholder="Price"
             className="form-control m-2"
             value={price}
            />

           {from && (<DatePicker
            defaultValue={moment(from, "YYYY-MM-DD")}
            placeholder="From Date"
            className="form-control m-2"
            onChange={(date, dateString) => setValues(prevValues => ({...prevValues, from: dateString}))}
            disabledDate={(current) => current.valueOf() < moment().subtract(1, "days")}
           /> )}

           {to && (<DatePicker
            defaultValue={moment(to, "YYYY-MM-DD")}
            placeholder="To Date"
            className="form-control m-2"
            onChange={(date, dateString) => setValues(prevValues => ({...prevValues, to: dateString}))}
            disabledDate={(current) => current.valueOf() < moment().subtract(1, "days")}
           />)}

           <Select className="w-100 m-2" value={bed} size="large" placeholder="Number of beds" onChange={(value) => setValues(prevValues => ({...prevValues, bed: value}))}>
              <Option key={1}>1</Option>
              <Option key={2}>2</Option>
              <Option key={3}>3</Option>
              <Option key={4}>4</Option>
           </Select>

           <button className="btn btn-outline-primary m-2">Save</button>
           <ToastContainer />
        </form>
    )
}

export default HotelEditForm