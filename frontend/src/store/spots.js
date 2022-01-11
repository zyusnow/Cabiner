const ADD_SPOT = 'spots/addSpot';

export const addSpot = (newSpot) => {
    return {
        type: ADD_SPOT,
        newSpot
    }
}

// export const createSpot = (payload) => async (dispatch) => {

// }
