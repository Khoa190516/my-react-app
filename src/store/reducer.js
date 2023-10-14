import { GET_TOKEN, SET_TOKEN, MAKE_REQUEST, FAIL_REQUEST } from "./actionType";

const initialState = {
    loading: true,
    token: '',
    errMessage: '',
}

export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FAIL_REQUEST:
            return {
                ...state,
                loading: false,
                errMessage: action.payload
            }
        case GET_TOKEN:
            return {
                ...state,
                loading: false,
                errMessage: '',
                token: action.payload
            }
        case SET_TOKEN:
            state.token = action.payload
            return{
                ...state,
                loading: false,
                errMessage: '',
                token: action.payload
            }
        default:
            return state
    }
}