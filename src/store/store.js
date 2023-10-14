// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { Reducer } from './reducer'
 import thunk from 'redux-thunk';
// import logger from 'redux-logger';

// const rootReducer = combineReducers({ user: Reducer })

// const Store = configureStore({ reducer: rootReducer, middleware: [thunk, logger] })
// export default Store

import { configureStore } from "@reduxjs/toolkit";
import navbarSlice from "./profileMenuSlice";


// const logger = createLogger({})
const Store = configureStore({
    reducer: {
        profileMenu: navbarSlice,
    },
    middleware: [thunk]
})

export default Store;