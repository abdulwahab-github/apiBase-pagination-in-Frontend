import {configureStore}from "@reduxjs/toolkit";
import bookingReducer from "../Redux/Slices/bookingSlice"


const store = configureStore({
    reducer:{
        booking:bookingReducer
    }
});


export default store;