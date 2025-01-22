import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { addService, countServicePrice, removeService } from '../Redux/Slices/bookingSlice';

const Page1 = () => {
    const dispatch = useDispatch();
    const selectedServices = useSelector(state =>state.booking)

    const handleServiceSelection = (service) => {
      if (selectedServices.services.some((s) => s.id === service.id)) {
            dispatch(removeService(service));
            dispatch(countServicePrice({ price: service.price, operation: "subtract" }));
        } else {
            dispatch(addService(service));
            dispatch(countServicePrice({ price: service.price, operation: "add" }));

        }
        





        // if (selectedServices.some((s) => s.id === service.id)) {
        //     dispatch(removeService(service));
        // } else {
        //     dispatch(addService(service));
        // }
    };

    const services = [
        { id: 1, name: 'Service 1', price: 100 },
        { id: 2, name: 'Service 2', price: 200 },
    ];
    console.log(selectedServices,"useSelector");

    return (
        <div>
            <h2>Select Services</h2>
            <ul>
                {services.map((service) => (
                    <li key={service.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedServices.services.some((s) => s.id === service.id)}
                                onChange={() => handleServiceSelection(service)}
                            />
                            {service.name} - ${service.price}
                        </label>
                    </li>
                ))}
            </ul>
            <div>
                <h3>Selected Services</h3>
                <ul>
                    {selectedServices.services&&selectedServices.services.map((service) => (
                        <li key={service.id}>{service.name} - ${service.price}</li>

                    ))}
                </ul>
                <h4>Total:{selectedServices.countPrice}</h4>
            </div>
        </div>
    );
};

export default Page1;
