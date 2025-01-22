import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "../index.css"
const socket = io("http://localhost:3003"); // Backend server

function RideRequest() {
  const [pickupLat, setPickupLat] = useState("");
  const [pickupLong, setPickupLong] = useState("");
  const [driverLat, setDriverLat] = useState("");
  const [driverLong, setDriverLong] = useState("");
  const [driverId, setDriverId] = useState("");
  const [rideId, setRideId] = useState(""); // Store ride ID when a request is received
  const [rideDetail, setrideDetail] = useState(""); // Store ride ID when a request is received
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Listen for ride requests for drivers
    socket.emit("join", { userId:"675fef0b8620c157036f4a22" });
    socket.emit("driverOnline", {
      driverId: '67667056f9c001f9c884a876',
    });
    socket.on("rideRequest", (data) => {
      console.log("Ride request received:", data);
      setMessage(`New ride request for pickup at (${data?.pickup.lat}, ${data?.pickup.long})`);
      setRideId(data.rideId); // Save the ride ID for accepting
      setrideDetail(data); // Save the ride ID for accepting
    });

    // Listen for notifications
    socket.on("requestAccepted", (data) => {
        console.log(data,"requestAccepted");
        
      setMessage(`Ride accepted by driver ${data.driverId}`);
    });

    socket.on("rideCancelled", (data) => {
      setMessage(data.message);
    });

    socket.on("noDriversAvailable", (data) => {
      setMessage(data.message);
    });
 

    return () => {
      socket.emit("disconnect", { userId: "675fef0b8620c157036f4a22" });
      socket.off();
    };
  }, []);

  const handleSendRequest = () => {
    if (pickupLat && pickupLong) {
      socket.emit("sendRideRequestToDrivers", {
        rideId: "677d0a350afc9369b8cdae5d", // Example ride ID
        userId: "675fef0b8620c157036f4a22", // Example user ID
        tripType:"economy",
        pickupLat: parseFloat(pickupLat),
        pickupLong: parseFloat(pickupLong),
      });
      setMessage("Searching for drivers...");
    }
  };

  const handleDriverOnline = () => {
    if (driverLat && driverLong) {
      
      setMessage(`Driver ${driverId} is now online.`);
    }
  };

  const handleAcceptRide = () => {
    if (rideId && driverId) {
      socket.emit("acceptRequest", {
        userId: "675fef0b8620c157036f4a22", // Example user ID
        rideId,
        driverId,
        driverLocation:rideDetail?.driverLocation
      });
      setMessage(`Driver ${driverId} has accepted the ride.`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-3xl font-bold underline">Ride Matching App</h1>
     
      <div class="relative before:content-['→'] before:text-red-500 before:mr-2 mb-2">
  Next Step
</div>
 

      {/* Driver Online Section */}
      <h2 className="text-2xl font-bold underline">Driver Login</h2>
      <div>
        <label className="relative after:content-[''] after:block after:w-10 after:h-1 after:bg-blue-500 mr-5">Driver ID: </label>
        <input
        className="shadow appearance-none border border-red-500 rounded w-50 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"

          type="text"
          value={driverId}
          onChange={(e) => setDriverId(e.target.value)}
        />
      </div>

      <div>
        <label  className="relative after:content-[''] after:block after:w-10 after:h-1 after:bg-blue-500 mr-5">Driver Latitude: </label>
        <input
        className="shadow appearance-none border border-red-500 rounded w-50 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"

          type="number"
          value={driverLat}
          onChange={(e) => setDriverLat(e.target.value)}
        />
      </div>
      <div>
        <label  className="relative after:content-[''] after:block after:w-10 after:h-1 after:bg-blue-500 mr-5">Driver Longitude: </label>
        <input
        className="shadow appearance-none border border-red-500 rounded w-50 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
          value={driverLong}
          onChange={(e) => setDriverLong(e.target.value)}
        />
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mb-5"onClick={handleDriverOnline}>Go Online</button>

      {/* Accept Ride Section */}
      <h2 className="text-2xl font-bold underline">Ride Request</h2>
      {rideId && (
        <div>
          <p>Ride ID: {rideId}</p>
          <button onClick={handleAcceptRide}>Accept Ride</button>
        </div>
      )}

      {/* Passenger Section */}
      <h2 className="text-2xl font-bold underline">Passenger Ride Request</h2>
      <div>
        <label  className="relative after:content-[''] after:block after:w-10 after:h-1 after:bg-blue-500 mr-5">Pickup Latitude: </label>
        <input
        className="shadow appearance-none border border-red-500 rounded w-50 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        
          type="number"
          value={pickupLat}
          onChange={(e) => setPickupLat(e.target.value)}
        />
      </div>
      <div>
        <label  className="relative after:content-[''] after:block after:w-10 after:h-1 after:bg-blue-500 mr-5">Pickup Longitude: </label>
        <input
        className="shadow appearance-none border border-red-500 rounded w-50 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"

          type="number"
          value={pickupLong}
          onChange={(e) => setPickupLong(e.target.value)}
        />
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={handleSendRequest}>Send Ride Request</button>

      {/* Notifications */}
      <p>{message}</p>
    </div>
  );
}

export default RideRequest;
