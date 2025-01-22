import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://192.168.18.125:3000/');

const LiveAuctionControl = ({ liveId }) => {
  const [startingBid, setStartingBid] = useState('');
  const [reservePrice, setReservePrice] = useState('');
  const [auctionDuration, setAuctionDuration] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [message, setMessage] = useState('');
  const [durationInSeconds, setDurationInSeconds] = useState(0);
  
  useEffect(() => {
    if (!liveId) return;

    const handleAuctionCountdownUpdate = ({ liveId: id, duration }) => {
      if (id === liveId) {
        console.log("duration", duration);
        setDurationInSeconds(duration);
      }
    };

    socket.on('auctionCountdownUpdate', handleAuctionCountdownUpdate);

    return () => {
      socket.off('auctionCountdownUpdate', handleAuctionCountdownUpdate);
    };
  }, [liveId]);

  useEffect(() => {
    let timer;
    if (durationInSeconds > 0) {
      timer = setInterval(() => {
        setDurationInSeconds(prev => prev - 1);
      }, 1000);
    } else if (durationInSeconds === 0) {
      clearInterval(timer);
      // Emit auction ended event if needed
      socket.emit('auctionEnded', { liveId });
    }

    return () => clearInterval(timer);
  }, [durationInSeconds]);

  const handleUpdateLiveOptions = async (action) => {
    const payload = {
      action,
      liveId,
      startingBid: action === 'placeBid' ? undefined : startingBid,
      reservePrice: action === 'placeReservePrice' ? undefined : reservePrice,
      auctionDuration: action === 'setAuctionDuration' ? auctionDuration : undefined,
      bidAmount: action === 'placeBid' ? bidAmount : undefined,
      userId: 'currentUserId', // Replace with actual user ID
    };

    try {
      const response = await axios.post('http://localhost:3000/updateLiveOption', payload);
      setMessage(response.data.message);

      // If setting auction duration, emit the duration to the server
      if (action === 'setAuctionDuration') {
      // You may need to implement this function
        socket.emit('setAuctionDuration', { streamId: liveId, duration: auctionDuration });
        setDurationInSeconds(durationInSeconds);
      }

    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Live Auction Control</h1>
      {message && <p>{message}</p>}
      <p>Auction Duration: {formatDuration(durationInSeconds || 0)} seconds</p>
      <div>
        <h2>Set Auction Duration</h2>
        <input
          type="text"
          value={auctionDuration}
          onChange={(e) => setAuctionDuration(e.target.value)}
          placeholder="e.g. 10 minutes"
        />
        <button onClick={() => handleUpdateLiveOptions('setAuctionDuration')}>Set Duration & Start Auction</button>
      </div>

      <div>
        <h2>Place Bid</h2>
        <input
          type="text"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Enter your bid amount"
        />
        <button onClick={() => handleUpdateLiveOptions('placeBid')}>Place Bid</button>
      </div>

      <div>
        <h2>Set Reserve Price</h2>
        <input
          type="text"
          value={reservePrice}
          onChange={(e) => setReservePrice(e.target.value)}
          placeholder="Enter reserve price"
        />
        <button onClick={() => handleUpdateLiveOptions('placeReservePrice')}>Set Reserve Price</button>
      </div>
    </div>
  );
};

// Utility function to convert duration string to seconds
const convertDurationToSeconds = (duration) => {
  const timeParts = duration.match(/(\d+)\s*minutes?/) || [];
  const minutes = parseInt(timeParts[1]) || 0;
  return minutes * 60;
};

export default LiveAuctionControl;
