import { diffDays } from "../../actions";
import { useNavigate } from 'react-router';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useSelector } from "react-redux";

const SmallCard = ({ hotels: { _id, bed, content, from, to, image, location, price, title }, owner = false, showViewMoreButton = true }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const handleNavigate = (id) => {
        navigate(`/hotel/${id}`)
    }
    const handleHotelDelete = async (id) => {
        if(!window.confirm("Are you sure ?")) return
        let res = await axios.delete(`http://localhost:7000/api/delete-hotel/${id}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        window.location.reload();
    }
    return (
       <>
         <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-md-4">
                    {
                        image && image.contentType ? (
                            <img className="card-image img img-fluid" src={`http://localhost:7000/api/hotel/image/${_id}`} alt="" />
                        )
                        : 
                        (
                            <img src="https://via.placeholder.com/900*500.png?text=BOOKING" alt="FAKE" />
                        )
                    }
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h3 className="card-title">{title} <span className="float-right text-primary">${price}</span></h3>
                        <p className="alert alert-info">{location}</p>
                        <p className="card-text">{`${content.substring(0, 200)}...`}</p>
                        <p className="card-text">
                            <span className="float-right text-primary">
                                for {diffDays(from, to)} {diffDays(from, to) <= 1 ? "day" : "days"}
                            </span>
                        </p>
                        <p className="card-text">{bed}</p>
                        <p className="card-text">Available from {new Date(from).toLocaleDateString()}</p>
                        {showViewMoreButton && <button onClick={() => handleNavigate(_id)} className="btn btn-primary">Show More</button>}
                        <div className="d-flex justify-content-between h4">
                        {
                            owner && 
                            <>
                                <Link to={`/hotel/edit/${_id}`}>
                                   <EditOutlined className="text-warning" />
                                </Link>
                            <DeleteOutlined className="text-danger" onClick={() => handleHotelDelete(_id)} />
                            </>
                        }
                        </div>
                    </div>
                </div>
            </div>
         </div>
       </>
    )
}

export default SmallCard