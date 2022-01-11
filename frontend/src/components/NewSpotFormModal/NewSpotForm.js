import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import { addNewSpot } from "../../store/spots";
import '../LoginFormModal/LoginForm.css';



function NewSpotForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const [images, setImages] = useState([]);

  // if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const newSpot = dispatch(addNewSpot({
        address,
        city,
        state,
        country,
        name,
        price,
        zipcode,
        description,
        userId,
        images
    }))
    .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
  }


  return (
    <div className='login_container'>
      <div className='login_title'>Add a spot </div>
    </div>
  )
}

export default NewSpotForm;
