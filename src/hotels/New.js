import React from "react";
import HotelForm from "../component/HotelForm";

const NewHotels = () => {

    return (
        <>
        <div className="container-fluid bg-secondary p-5 text-center">
            <h2>Add Hotels</h2>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <br />
                    <HotelForm />
                </div>
                
            </div>
        </div>
        </>
    )
}
export default NewHotels;