
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { fetchApiSpots } from "../../store/spots";
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

function UserProfile(user) {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
    const userId = +id;
    const spots = useSelector(state => state.spot);
    const spotsArr = Object.values(spots);
    const userSpotsArr = spotsArr.filter((spots) => spots.userId === +userId);


    const toSpot=(id,e)=> {
        e.preventDefault();
        history.push(`/spots/${id}`);
    }

    useEffect(() => {
        dispatch(fetchApiSpots());
    }, [dispatch]);

    return (
      <>
        <div className='page_title'> {sessionUser.username}'s Spots </div>
        <div className='spots_container'>
           {userSpotsArr.map(spot => (
                    <div className='spot_container'key={spot.id} onClick={e=>toSpot(spot.id,e)}>
                        <div className='img_container'><img className="img" src={spot.Images[0].url}></img></div>
                        <div key={spot.id} className='spotNameLink' onClick={e=>toSpot(spot.id,e)}>{spot.name}</div>
                    </div>
                ))}
        </div>
      </>
      )


    }
export default UserProfile;
