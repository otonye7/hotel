const SmallCard = ({ hotels: { _id, bed, content, createdAt, from, to, image, location, price, title } }) => {
    

    return (
       <>
         <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src="https://via.placeholder.com/900*500.png?text=BOOKING" alt="FAKE" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h3 className="card-title">{title} <span className="float-right text-primary">${price}</span></h3>
                        <p className="alert alert-info">{location}</p>
                        <p className="card-text">{`${content.substring(0, 200)}...`}</p>
                    </div>
                </div>
            </div>
         </div>
       </>
    )
}

export default SmallCard