import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    services:[],
    countPrice:0,
    dateTime: {}, // Store selected date, time, and staff details
    userDetails: {},
}

const bookingSlice = createSlice({
    name:"booking",
    initialState,
    reducers:{
        addService:(state,action)=>{
            const {name,id,price}=action.payload;
            const existingService = state.services.find((service) => service.id === id);
            if (!existingService) {
                state.services.push({ id, name, price });
            };
        },
        removeService: (state, action) => {
            state.services = state.services.filter((service) => service.id !== action.payload.id);
        },
        countServicePrice: (state, action) => {
            const { price, operation } = action.payload; // Determine the operation (add/remove)
            const replace = parseInt(price);
            if (operation === "add") {
                state.countPrice += replace;
            } else if (operation === "subtract") {
                state.countPrice -= replace;
            }
        },
        updateDateTime: (state, action) => {
            const { serviceId, date, time, staffId } = action.payload;
            const service = state.services?.find((service) => service.id == serviceId);
            if (service) {
                service.date = date;
                service.time = time;
                service.staffId = staffId;
            }
        },
        updateUserDetails: (state, action) => {
            state.userDetails = action.payload;
        },
        clearBooking: (state) => {
            state.services = [];
            state.dateTime = {};
            state.userDetails = {};
        },

    }
});

export const { addService, removeService, updateDateTime, updateUserDetails, clearBooking,countServicePrice } = bookingSlice.actions;

export default bookingSlice.reducer