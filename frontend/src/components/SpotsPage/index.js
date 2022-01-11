
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchApiSpots} from "../../store/spots";


function SpotsPage() {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots);
    console.log("hihihi", spots)

    useEffect(() => {
        dispatch(fetchApiSpots());
      }, [dispatch]);

    return (
        <h2>Stays in top lovely cabins </h2>


    )
}

export default SpotsPage;
