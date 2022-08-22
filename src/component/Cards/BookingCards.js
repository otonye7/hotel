import { diffDays } from "../../actions";

const BookingCard = ({ hotels: { hotel: { _id, bed, content, from, to, image, location, price, title } }, session, orderedBy, showViewMoreButton = true }) => {
    // console.log(props.hotels.hotel)
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
                    </div>
                </div>
            </div> 
         </div>
       </>
    )
}

export default BookingCard