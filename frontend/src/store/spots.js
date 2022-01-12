import { csrfFetch } from "./csrf";

const ADD_SPOT = 'spots/addSpot';
const GET_SPOTS = 'spots/getSpots';
const GET_SPOT = 'spots/getSpot';
const DELETE_SPOT = 'spots/deleteSpot';

const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot
}};

const getSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots,
}};

const getSpot = (spot) => {
    return {
      type: GET_SPOT,
      spot,
}};

const deleteSpot = (id) => ({
    type: DELETE_SPOT,
    id
})

export const fetchApiSpots = () => async dispatch => {
    const res = await csrfFetch(`/api/spots`);
    if (res.ok) {
      // const data = await res.json();
      // console.log("testing", data);
      const spots = await res.json();
      dispatch(getSpots(spots));
}};

export const fetchApiSpot = (id) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${+id}`);
    if (res.ok) {
      // const data = await res.json();
      // console.log("testing", data);
      const spot = await res.json();
      dispatch(getSpot(spot));
}};

export const editSpot = (spot) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spot.id}/edit`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(spot)
    });
    if (res.ok) {
      const spot = await res.json();
      dispatch(addSpot(spot));
      return spot
}};


export const deleteOldSpot = (id) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${+id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    });
    if (res.message==="Delete sucessfully") {
        dispatch(deleteSpot(id))
    }
}



export const addNewSpot = (spot) => async (dispatch) => {
  const res = await fetch(`/api/spots/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(spot)
  });


  if (res.ok) {
    const spot = await res.json();
    await dispatch(addSpot(spot));
    return spot
  }
  // const {address,
  //   city,
  //   state,
  //   country,
  //   name,
  //   price,
  //   zipcode,
  //   description,
  //   userId,
  //   url} = spot

  // const formData = new FormData();
  // formData.append("address", address);
  // formData.append("city", city);
  // formData.append("state", state);
  // formData.append("country", country);
  // formData.append("name", name);
  // formData.append("price", price);
  // formData.append("zipcode", zipcode);
  // formData.append("description", description);
  // formData.append("userId", userId);

  //   // for multiple files
  // if (images && images.length !== 0) {
  //   for (let i = 0; i < images.length; i++) {
  //     formData.append("images", images[i]);
  //   }
  // }

  // const res = await csrfFetch(`/api/spots/add`, {
  //   method: "POST",
  //   headers: {
  //   "Content-Type": "multipart/form-data",
  //   },
  //   body: formData,
  // });
  // const newSpot = await res.json();
  // dispatch(addSpot(newSpot));
}

const initialState = {};
const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type){
    case ADD_SPOT:
      newState = {...state};
      newState[action.spot.id] = action.spot;
      return newState;
    case GET_SPOTS:
      newState = {...state};
      // console.log("arr", action.spots);
      action.spots.forEach(spot => {
        newState[spot.id] = spot
      })
      return newState;
    case GET_SPOT:
      newState = {...state};
      newState[action.spot.id] = action.spot
      console.log("spot", action.spot);
      return newState;
    case DELETE_SPOT:
      newState = {...state};
      delete newState[action.id]
      return newState;
    default:
      return state;
  }
}

export default spotReducer;
