import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "../index.css";
import axios from "axios";
const socket = io("http://localhost:3003"); // Backend server

function OrderRequest() {
  const [driverId,setdriverId] = useState("67667056f9c001f9c884a876")
  const [orderDetail,setorderDetail] = useState()
  useEffect(() => {
    const userId = "6773d0cc07d51c205a1f7745"; // Example userId

    // Listen for ride requests for drivers
    socket.emit("join", { userId });
    socket.emit("driverOnline", {
      driverId: '67667056f9c001f9c884a876',
    });
    socket.on("sendOrderRequest", (data) => {
      setorderDetail(data?.data);
      console.log("socket data", data);
    });
    socket.on("orderRequest", (data) => {
      console.log("order request received:", data);
    });
    // Handle browser tab close or refresh (beforeunload event)
    const handleBeforeUnload = () => {
      socket.emit("customDisconnect", { userId });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    // Clean up on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      socket.emit("customDisconnect", { userId }); // Custom disconnect event
      socket.off();
    };
  }, []);

  const order = () => {
    axios
      .post(
        "http://localhost:3003/order",
        {
          productOwner: "677bdf3df6af6aa447b110e6",
          items: [
            {
              product: "67877d6fa4321a266229a8c1",
              quantity: 2,
              price: 15,
            },
          ],
          deliveryNotes: ["Please Come Fast", "Food must be fresh"],
          pickupLocation: {
            name: "Numaish",
            lat: 17.3856,
            long: 78.4704,
          },
          dropLocation: {
            name: "Jheel Park Rd",
            lat: 24.8688,
            long: 67.0614,
          },
          deliveryFee:20,
          totalAmount: 35,
          paymentMethod: "cash",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVmZWYwYjg2MjBjMTU3MDM2ZjRhMjIiLCJlbWFpbCI6InRlc3Rpbmd1c2VyQGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiNjg0ODQ1ODQwMTU0NSIsImlzU3VzcGVuZCI6ZmFsc2UsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM2NDEzOTIwfQ.N9isqETfzS-DSxI0QuNrtwGB1_GqPi4smCBvPHzOMXM",
          },
        }
      )
      .then((res) => {
        console.log("order request received:", res);
      })
      .catch((err) => {
        console.log(err, "Error sending message");
      });
  };
  const assignDriver = ()=>{
    console.log(driverId,"driverId");
    socket.emit("sendOrderRequestToDriver", { orderId:orderDetail?._id,driverId});
    
  };
  return (
    <div className="w-full container">
      <h1 className="flex justify-center p-5 text-xl font-mono text-slate-500 hover:text-blue-600 hover:cursor-pointer">
        All order sockets
      </h1>

      <button onClick={order}>Order Now</button>
      <br />
      <br />
      <input
        type="text"
        id="first_name"
        value={driverId}
        onChange={(e)=>setdriverId(e.target.value)}
        className="w-[40%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Driver id"
        required
      />

      <button
        onClick={assignDriver}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Assign to driver
      </button>
    </div>
  );
}

export default OrderRequest;
