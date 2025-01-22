import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserDetails } from '../Redux/Slices/bookingSlice';
// import { updateUserDetails } from './features/bookingSlice';

const Page3 = () => {
    const dispatch = useDispatch();
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        dispatch(updateUserDetails(userDetails))
        // dispatch(updateUserDetails(userDetails));
    };

    return (
        <div>
            <h2>User Details</h2>
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
            />
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
            />
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default Page3;
