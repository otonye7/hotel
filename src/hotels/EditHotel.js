import HotelEditForm from "../component/HotelEditForm";

const EditHotel = () => {

    return (
       <>
        <div className="container-fluid bg-secondary p-5 text-center">
            <h2>Edit Hotel</h2>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <br />
                    <HotelEditForm />
                </div>
                
            </div>
        </div>
       </>
    )
}

export default EditHotel