// Import dependencies
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Initialize socket connection
const socket = io("http://localhost:3000"); // Ensure this URL matches your backend

function GiveawayComponent({ user }) {
  const [winner, setWinner] = useState(null);

// UseEffect to emit the "chooseWinner" event correctly
useEffect(() => {
    const streamId = '673443600b0f264be2d8ddfd';
    const userId = '66a898cd4d581725db7b5970'; // Assuming `user` is provided as a prop
  
    // Emit "chooseWinner" with streamId and userId directly
    socket.emit("chooseWinner", { streamId, userId });
  
    // Listen for the "randomWinner" event and update the state with the winner data
    socket.on("randomWinner", ({ streamId, user, giveAwayProduct }) => {
      console.log("Random winner received:", { streamId, user, giveAwayProduct });
      setWinner({ streamId, user, giveAwayProduct });
    });
  
    // Clean up the socket listener when the component unmounts
    return () => {
      socket.off("randomWinner");
    };
  }, []);
  

  return (
    <div>
      {winner ? (
        <div>
          <h2>Winner Announced!</h2>
          <p><strong>Stream ID:</strong> {winner.streamId}</p>
          <p><strong>Winner Name:</strong> {winner.user.firstname} {winner.user.lastname}</p>
          <img src={winner.user.image} alt={`${winner.user.firstname}'s profile`} width="100" />
          <p><strong>Giveaway Product:</strong> {winner.giveAwayProduct}</p>
        </div>
      ) : (
        <p>Waiting for a winner...</p>
      )}
    </div>
  );
}

export default GiveawayComponent;
