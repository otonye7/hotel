import { useState } from "react";
import AlgoliaPlaces from "algolia-places-react";

const NewHotels = () => {
    const [values, setValues] = useState({
        title: "",
        content: "",
        location: "",
        image: "",
        price: "",
        from: "",
        to: "",
        bed: ""
    })

    const { title, content, location, image, price, from, to, bed } = values;
    console.log(title)
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleImageChange = () => {

    }

    const handleChange = (e) => {

    }

    const hotelForm = () => {
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
                 type="number"
                 name="price"
                 onChange={handleChange}
                 placeholder="Price"
                 className="form-control m-2"
                 value={price}
                />

                <input 
                 type="number"
                 name="bed"
                 onChange={handleChange}
                 placeholder="Number of Beds"
                 className="form-control m-2"
                 value={bed}
                />
    
               <button className="btn btn-outline-primary m-2">Save</button>

            </form>
        )
    }

    return (
        <>
        <div className="container-fluid bg-secondary p-5 text-center">
            <h2>Add Hotels</h2>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <br />
                    {hotelForm()}
                </div>
                <div className="col-md-2">Image</div>
            </div>
        </div>
        </>
    )
}
export default NewHotels;