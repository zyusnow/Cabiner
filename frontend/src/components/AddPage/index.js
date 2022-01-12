import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addNewSpot } from "../../store/spots";
import '../LoginFormModal/LoginForm.css';
import './AddPage.css'



function NewSpotForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const userId = sessionUser.id;
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [zipcode, setZipcode] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [url4, setUrl4] = useState("");


  if(!sessionUser) {
    history.push('/');
  }

  // if (sessionUser) return <Redirect to="/" />;
  useEffect(() => {
    const errors = [];
    if (address.length > 200) errors.push("Address must not be more than 200 characters long")
    if (city.length > 50) errors.push("City must not be more than 50 characters long")
    if (state.length > 50) errors.push("State must not be more than 50 characters long")
    if (country.length > 50) errors.push("Country must be less 50 characters")
    if (name.length > 50) errors.push("Name must not be more than 50 characters long")
    if (description.length > 1000) errors.push("Description must not be more than 1000 characters long")
    if (price < 0) errors.push("Please provide a valid price")
    if (zipcode.length>20) errors.push("Please provide a valid zip code")
    if (url1.length > 250) errors.push("Please provide a image url.")
    if (url2.length > 250) errors.push("Please provide a image url.")
    if (url3.length > 250) errors.push("Please provide a image url.")
    if (url4.length > 250) errors.push("Please provide a image url.")
    setErrors(errors)
    }, [address, city, state, country, name, description, price, zipcode, url1, url2, url3, url4])


  const handleSubmit = (e) => {
    e.preventDefault();
    const newSpot = {
      oneSpot:{
        address,
        city,
        state,
        country,
        name,
        price,
        zipcode,
        description,
        userId,
      },
      images:{
        url1,
        url2,
        url3,
        url4
      }
    }
    let data;
    try{
      data = dispatch(addNewSpot(newSpot));
    } catch(error) {
      throw new Error
    }
    console.log("i'm data",data)
    if (data) {
      history.push(`/spots/${data.id}`);
  }}
  // .catch(async (res) => {
  //   const data = await res.json();
  //   console.log(data)
  //   if (data && data.errors) setErrors(data.errors);
  // })
  // history.push(`/spots/${data.id}`);


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
              <textarea
              className="textarea"
              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder='Description'
              cols="30"
              rows="3"
            />
              <input
                type="text"
                value={url1}
                onChange={(e) => setUrl1(e.target.value)}
                required
                placeholder='Image 1 Url'
              />
              <input
                type="text"
                value={url2}
                onChange={(e) => setUrl2(e.target.value)}
                required
                placeholder='Image 2 Url'
              />
              <input
                type="text"
                value={url3}
                onChange={(e) => setUrl3(e.target.value)}
                required
                placeholder='Image 3 Url'
              />
              <input
                type="text"
                value={url4}
                onChange={(e) => setUrl4(e.target.value)}
                required
                placeholder='Image 4 Url'
              />
              </div>
          <button className='login_btn'type="submit">Submit</button>
        </form>
        </div>
    </div>
  )
}

export default NewSpotForm;
