import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOldSpot, fetchApiSpot } from "../../store/spots";
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import './SpotPage.css';

function SpotPage(){
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();   // id here is a string
    const spotId = +id;  // change it to a number
    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spot);  // get spot: spotReducer(in store index.js) 's state
    useEffect(() => {
        dispatch(fetchApiSpot(spotId));
    }, [dispatch],spotId);
    // after useEffect
    // console.log("1hihi",spot[spotId].Images);
    const imgArr = spot[spotId]?.Images;

    const goToSpots=(e)=>{
        e.preventDefault();
        history.push('/spots');
      }
    // const spots = useSelector(state => state.spot);
    // const { id } = useParams();
    // useEffect(() => {
    //     dispatch(fetchApiSpots());
    // }, [dispatch]);
    // console.log(spots);
    // const spotsArr = Object.values(spots);
    // const spot = spotsArr.filter((spot) => spot["id"] === +id);
    // console.log("hihi", spot[0].name)

    const gotodelete =async(e)=>{
        e.preventDefault();
        const res = await dispatch(deleteOldSpot(spotId));
        console.log(res);
        if (res.ok === true) {
            alert('Delete sucessfully!')
            history.push(`/users/${spot[spotId].userId}/spots`);
        }
    }

    return (
        <>
        <div className='cabin_container'>
              <div className='title'> {spot[spotId]?.name}</div>
              {sessionUser?.id===spot[spotId]?.userId &&
              <>
                <div className='useBtn'>
                  {/* <div className='forBack' onClick={gotoedit}>Edit</div> */}
                  <div className='forBack' onClick={gotodelete}>Delete</div>
                </div>
              </>}
            <div className='forBack'>
            <div className='address'>
                {spot[spotId]?.address}, {spot[spotId]?.city}, {spot[spotId]?.state}, {spot[spotId]?.country}, {spot[spotId]?.zipcode}
            </div>
            <div className='backToSpots'onClick={e=>goToSpots(e)}>See all cabins</div>
            </div>
            <div className='img_main_container'>
                {imgArr?.map(img => (
                    <div key={img?.id}>
                            <div className='img_container'><img className="img" src={img?.url}></img></div>

                    </div>
                ))}
            </div>
            <div className='description'>
            <h3>About this cabin</h3>
            <div> {spot[spotId]?.description}</div>
            </div>
        </div>
        </>
    )
}

export default SpotPage;
