import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import LiveStreamViewer from './LiveStreamViewer';

// Connect to the socket server
const socket = io('https://backend.iimiin.com'); // Replace with your server URL

const StreamComponent = () => {
    const userId = localStorage.getItem("user"); // Assuming this holds the logged-in user's ID
    const streamId = '673730952541a6b2f9b83fc8'; // Replace with your actual stream ID
    const productId = '672b36e559f41165dcef0a9c'; // Replace with the actual product ID for giveaway
    const [giveawayCount, setGiveawayCount] = useState(0);

    const handleJoinGiveaway = () => {
        console.log(`Joining giveaway for stream: ${streamId}, userId: ${userId}, productId: ${productId}`);
        socket.emit("joinGiveAway", { streamId, userId, giveAwayProductId:productId });
    };
    const handleselectProduct = () => {
        console.log(`placeProduct ${streamId}, userId: ${userId}, productId: ${productId}`);
        socket.emit("selectProduct", { streamId, productId,type:"giveAway" });
    };
    useEffect(() => {
        // Emit the "joinReact" event to inform the server the user is joining the stream
        socket.emit("authenticate", { userId });
        socket.emit("joinReact", { streamId });
    
        // Listen for updated giveaway count
        socket.on("updateGiveAwayCount", (entryCount) => {
            console.log(`Updated giveaway count: ${entryCount}`);
            setGiveawayCount(entryCount);
        });
        socket.on("displayProduct", (payload) => {
            console.log("Updated payload:", payload);
        });
        
        // Emit leaveStream when the tab or window is about to be closed or refreshed
        const handleBeforeUnload = () => {
            console.log("User is leaving the stream.");
            socket.emit("leaveStream", { streamId, userId });
        };
    
        // Add the event listener for beforeunload
        window.addEventListener("beforeunload", handleBeforeUnload);
    
        // Clean up listeners on component unmount
        return () => {
            socket.off("updateGiveAwayCount");
            window.removeEventListener("beforeunload", handleBeforeUnload);
            socket.emit("leaveStream", { streamId, userId }); // Notify the server when leaving the component
        };
    }, [streamId, userId]);
    

    return (
        <div>
            <h1>Stream Component</h1>
            <button onClick={handleJoinGiveaway}>Join Giveaway</button>
            <button onClick={handleselectProduct}>select Product</button>

            <p>Giveaway Entries: {giveawayCount}</p>

            {/* <LiveStreamViewer streamId={streamId} no={"1"} /> */}
        </div>
    );
};

export default StreamComponent;
