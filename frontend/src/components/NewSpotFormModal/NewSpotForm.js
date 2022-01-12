import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import { addNewSpot } from "../../store/spots";
import '../LoginFormModal/LoginForm.css';
import './NewSpotForm.css'



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

  const addFiles = (e) => {
    const files = e.target.files;
    setImages(files);
  };

  return (
    <div className='login_container'>
      <div className='login_title'>Please fill all the info below </div>
      <div className='login_form_container'>
        <form className='login_form' onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
            <div className='login_input'>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder='Name'
                name='name'
              />
              <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder='Address'
              name='name'
              />

              <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              placeholder='City'
              />

              <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              placeholder='State'
            />
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              placeholder='Country'
            />
            <input
              type="text"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              required
              placeholder='Zipcode'
            />
              <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder='Price'
            />
              <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder='Description'
            />
          </div>
          <label className="add_img">
              <input
                type="file"
                multiple
                onChange={addFiles} />
                </label>
          <button className='login_btn'type="submit">Submit</button>
        </form>
        </div>

    </div>
  )
}

export default NewSpotForm;
