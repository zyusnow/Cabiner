
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { fetchApiSpots } from "../../store/spots";
import { useHistory } from 'react-router';
import './SpotsPage.css'

function SpotsPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const spots = useSelector(state => state.spot);
    console.log("hihihi", spots)


    const toSpot=(id,e)=> {
        e.preventDefault();
        history.push(`/spots/${id}`);
    }



    useEffect(() => {
        dispatch(fetchApiSpots());
    }, [dispatch]);

    return (
        <>
            <div className='page_title'> Find top lovely cabins </div>
            <div className='spots_container'>
                {Object.values(spots).map(spot => (
                    <div className='spot_container'key={spot.id} onClick={e=>toSpot(spot.id,e)}>
                        <div className='img_container'><img className="img" src={spot.Images[0].url}></img></div>
                        <div key={spot.id} className='spotNameLink' onClick={e=>toSpot(spot.id,e)}>{spot.name}</div>
                        {/* <NavLink className='spotNameLink' to={`/spots/${spot.id}`}>{spot.name}</NavLink> */}
                    </div>
                ))}
            </div>
        </>
    )
}
export default SpotsPage;
