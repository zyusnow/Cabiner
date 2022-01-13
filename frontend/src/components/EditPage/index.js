
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { fetchApiSpot } from "../../store/spots";
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { editSpot } from '../../store/spots';
import "./EditSpot.css";



function EditSpot() {

    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const {id} = useParams();
    const spotId = +id;
    const spot = useSelector(state => state.spot[spotId]);
    // console.log("i'm edit spot",spot)

    // const imgurlkey = spot.Images[0].url1
    // console.log(imgurlkey)
    useEffect(() => {
        dispatch(fetchApiSpot(spotId));
    }, [dispatch],spotId);

    const userId = sessionUser?.id;
    const [address, setAddress] = useState(spot?.address);
    const [city, setCity] = useState(spot?.city);
    const [state, setState] = useState(spot?.state);
    const [country, setCountry] = useState(spot?.country);
    const [name, setName] = useState(spot?.name);
    const [price, setPrice] = useState(spot?.price);
    const [zipcode, setZipcode] = useState(spot?.zipcode);
    const [description, setDescription] = useState(spot?.description);
    const [url1, setUrl1] = useState(spot?.Images[0].url);
    const [url2, setUrl2] = useState(spot?.Images[1].url);
    const [url3, setUrl3] = useState(spot?.Images[2].url);
    const [url4, setUrl4] = useState(spot?.Images[3].url);
    const [errors, setErrors] = useState([]);





    useEffect(() => {
        const validateErrors = [];
        if (address.length > 200) errors.push("Address must not be more than 200 characters long")
        if (city.length > 50) errors.push("City must not be more than 50 characters long")
        if (state.length > 50) errors.push("State must not be more than 50 characters long")
        if (country.length > 50) errors.push("Country must be less 50 characters")
        if (name.length > 50) errors.push("Name must not be more than 50 characters long")
        if (description?.length > 1000) errors.push("Description must not be more than 1000 characters long")
        if (price < 0) errors.push("Please provide a valid price")
        if (zipcode.length>20) errors.push("Please provide a valid zip code")
        if (url1.length > 250) errors.push("Please provide a image url.")
        if (url2.length > 250) errors.push("Please provide a image url.")
        if (url3.length > 250) errors.push("Please provide a image url.")
        if (url4.length > 250) errors.push("Please provide a image url.")
        setErrors(validateErrors)
        }, [address, city, state, country, name, description, price, zipcode, url1, url2, url3, url4])

        // useEffect(() => {
        //     const local
        // })
        const handleSubmit = async (e) => {
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
                img1:{url:url1, id:spot?.Images[0].id},
                img2:{url:url2, id:spot?.Images[1].id},
                img3:{url:url3, id:spot?.Images[2].id},
                img4:{url:url4, id:spot?.Images[3].id}
              }
            }
            // console.log("i'm newSpot",newSpot)
            let data;
            try{
              data = await dispatch(editSpot(newSpot,spotId));
            } catch(error) {
              throw new Error
            }
            if (data) {
              history.push(`/spots/${data?.id}`);
          }}



    return(
        <>
        <div className="edit_title">Edit your spot</div>

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
        </>
    )
}


export default EditSpot;

{/* <div className='info'>
    {spot?.address}, {spot?.city}, {spot?.state}, {spot?.country}, {spot?.zipcode}
    {spot?.description}
    {spot?.Images.map(img => (
        <div key={img?.id}>
                <div className='img_container'><img className="img" src={img?.url}></img></div>
        </div>
    ))}
</div> */}
