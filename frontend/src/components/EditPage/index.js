
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { fetchApiSpot } from "../../store/spots";
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import "./EditSpot.css";



function EditSpot() {

    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const {id} = useParams();
    const spotId = +id;
    const spot = useSelector(state => state.spot[spotId]);
    console.log("hihi",spot)

    // const imgurlkey = spot.Images[0].url1
    // console.log(imgurlkey)
    useEffect(() => {
        dispatch(fetchApiSpot(spotId));
    }, [dispatch],spotId);



    // const userId = sessionUser.id;
    // const [address, setAddress] = useState(spot.address);
    // const [city, setCity] = useState(spot.city);
    // const [state, setState] = useState(spot.state);
    // const [country, setCountry] = useState(spot.country);
    // const [name, setName] = useState(spot.name);
    // const [price, setPrice] = useState(spot.price);
    // const [zipcode, setZipcode] = useState(spot.zipcode);
    // const [description, setDescription] = useState(spot.description);
    // const [errors, setErrors] = useState([]);
    // const [url1, setUrl1] = useState();
    // const [url2, setUrl2] = useState();
    // const [url3, setUrl3] = useState();
    // const [url4, setUrl4] = useState();

    return(
        <>
        <div className="title">Edit your spot</div>
            <div className='cabin_container'>
                <div className='forBack'>
                <div className='address'>
                    {spot.address}, {spot.city}, {spot.state}, {spot.country}, {spot.zipcode}
                </div>
                </div>
                <div className='img_main_container'>
                    {spot.Images.map(img => (
                        <div key={img.id}>
                                <div className='img_container'><img className="img" src={img.url}></img></div>
                        </div>
                    ))}
                </div>
                <div className='description'>
                    <h3>About this cabin</h3>
                    <div> {spot.description}</div>
                </div>
            </div>

        </>
    )
}


export default EditSpot;
