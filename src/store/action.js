import { MAKE_REQUEST, FAIL_REQUEST, GET_TOKEN, SET_TOKEN } from "./actionType"

export const getToken = (token) => {
    return {
        type: GET_TOKEN,
        payload: token
    }
}

export const setToken = (token) => {
    return {
        type: SET_TOKEN,
        payload: token
    }
}

export const makeRequest = () => {
    return {
        type: MAKE_REQUEST,
    }
}

export const failRequest = (err) => {
    return {
        type: FAIL_REQUEST,
        payload: err
    }
}

export const FetchToken = () => {
    return (dispatch) => {
        dispatch(makeRequest())
        var data = localStorage.getItem('token')
        if(data === null || data === undefined || data === ""){
            dispatch(failRequest("get token fail: " + data))
        }else{
            dispatch(getToken(data))
        }
    }
}

export const SaveToken = () => {
    return (dispatch) => {
        dispatch(makeRequest())
        var data = localStorage.getItem('token')
        if(data === null || data === undefined || data === ""){
            dispatch(failRequest("get token fail: " + data))
        }else{
            dispatch(setToken(data))
        }
    }
}