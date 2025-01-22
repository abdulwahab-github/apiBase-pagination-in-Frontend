import { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Create socket connection
const socket = io('http://192.168.18.125:4000'); // Update with your backend URL

function PaymentStatus({ userId }) {
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    // Join the room using the userId once the component mounts
    socket.emit('connection', { userId });
    socket.emit('join', { userId });

    // Listen for the 'sendPaymentStatus' event from the server
    socket.on('sendPaymentStatus', (data) => {
      console.log('Payment status received:', data.status);
      setPaymentStatus(data.status);
    });

    // Cleanup socket listener when component unmounts
    return () => {
      socket.off('sendPaymentStatus');
      socket.emit('leave', { userId });  // Optional: leave the room when the component unmounts
    };
  }, [userId]);

  return (
    <div>
      <h1>Payment Status</h1>
      {paymentStatus === null ? (
        <p>Waiting for payment update...</p>
      ) : paymentStatus ? (
        <p>Payment completed successfully!</p>
      ) : (
        <p>Payment failed.</p>
      )}
    </div>
  );
}

export default PaymentStatus;
