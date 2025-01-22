import React from 'react';
import { useSelector } from 'react-redux';

const SubmitPage = () => {
    const bookingData = useSelector((state) => state.booking);

    const handleSubmit = async () => {
        const response = await fetch('/api/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });
        const result = await response.json();
        console.log(result);
    };

    return (
        <div>
            <h2>Review & Submit</h2>
            <pre>{JSON.stringify(bookingData, null, 2)}</pre>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default SubmitPage;
