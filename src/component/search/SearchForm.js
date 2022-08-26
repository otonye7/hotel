import { useState } from "react";
import { DatePicker, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router';

const { RangePicker } = DatePicker;
const { Option } = Select

const Search = () => {
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [bed, setBed] = useState("");
    const { hotelId } = useParams();
    const navigate = useNavigate();

    const handleLocation = (e) => {
        setLocation(e.target.value)
    }

    const handleSubmit = () => {
        navigate(`/search-result?location=${location}&date=${date}&bed=${bed}`)
    }

    return (
        <div className="d-flex pb-4">
            <div className="w-100">
            <input 
             type="text"
             name="location"
             onChange={handleLocation}
             placeholder="Location"
             className="form-control m-2"
             value={location}
            />  
        </div>

            <RangePicker
             onChange={(value, dateString) => setDate(dateString)}
             className="w-100"
             disabledDate={(current) => current && current.valueOf() < moment().subtract(1, "days")}
            /> 

            <Select onChange={(value) => setBed(value)} className="w-100" size="large" placeholder="Number of beds">
                <Option key={1}>{1}</Option>
                <Option key={2}>{2}</Option>
                <Option key={3}>{3}</Option>
                <Option key={4}>{4}</Option>
            </Select>

            <SearchOutlined onClick={handleSubmit} className="btn btn-primary p-3 btn-square" />

        </div>
    )
}

export default Search 