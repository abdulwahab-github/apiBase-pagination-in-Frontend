import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('https://hajjbackend.sidtechno.com/'); // Adjust to your backend server URL

const LocationComponent = ({userId}) => {
  useEffect(() => {
    socket.on("connection", () => {
        console.log("Connected to socket server");
      });
    // Function to send location
    const sendLocation = (lat, long) => {
      socket.emit('sendLocation', { userId, lat, long });
    };

    // Simulate sending location every 5 seconds
    const interval = setInterval(() => {
      const lat = "31.5558"; // Replace with actual lat
      const long = "74.3587"; // Replace with actual long
      sendLocation(lat, long);
    }, 5000);

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, []);

  return <div>Sending location...</div>;
};

export default LocationComponent;
