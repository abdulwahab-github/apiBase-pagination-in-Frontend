import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDateTime } from '../Redux/Slices/bookingSlice';
// import { updateDateTime } from './features/bookingSlice';

const Page2 = () => {
    const dispatch = useDispatch();
    const services = useSelector((state) => state.booking.services);

    const [formData, setFormData] = useState({
        serviceId: '',
        date: '',
        time: '',
        staffId: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        console.log(formData);
         dispatch(updateDateTime(formData))   
         console.log(services);
        // dispatch(updateDateTime(formData));
    };
    
    return (
        <div>
            <h2>Select Date & Time</h2>
            <select name="serviceId" onChange={handleChange}>
                <option value="">Select Service</option>
                {services.map((service) => (
                    <option key={service.id} value={service.id}>
                        {service.name}
                    </option>
                ))}
            </select>
            <input type="date" name="date" onChange={handleChange} />
            <input type="time" name="time" onChange={handleChange} />
            <input
                type="text"
                name="staffId"
                placeholder="Enter Staff ID"
                onChange={handleChange}
            />
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default Page2;
