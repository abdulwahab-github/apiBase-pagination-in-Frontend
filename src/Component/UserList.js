import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; // Import useHistory hook
import Chat from "./Chat"; // Import the Chat component
import io from "socket.io-client";
import { FaCamera } from "react-icons/fa";

const socket = io("https://backend.iimiin.com/");
const UserList = ({ onSelectUser, userId }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // State to track selected user
  const [messageCount, setMessageCount] = useState(0);
  const [messages, setMessages] = useState([]);

  const fetchUsers = async (userId) => {
    try {
      const response = await axios.get(
        `https://backend.iimiin.com/chats/${userId}`
      );
      setUsers(response.data.data); // Store users fetched from API
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("user");
    fetchUsers(userId);
  }, []);
  useEffect(() => {
    socket.on("connection", () => {
      console.log("Connected to socket server");
    });

    socket.emit("joinChat", { id: userId });

    socket.on("receiveMessage", (message) => {
      console.log(message, "UserListttttt>>>>>>>");

      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("connect");
    };
  }, [selectedUser, userId]);
  const handleUserClick = (user) => {
    setMessageCount(0);
    setSelectedUser(user); // Update selected user
    onSelectUser(user); // Call the existing function if needed
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div
        style={{
          width: "30%",
          borderRight: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
        {users.map((user) => (
          <div
            key={user.userId}
            onClick={() => handleUserClick(user)}
            style={{ display: "flex", alignItems: "center", padding: "10px" }}
          >
            <img
              src={`https://backend.iimiin.com/uploads/${user.profile}`}
              alt={user.name}
              style={{
                width: "40px",
                borderRadius: "20px",
                marginRight: "10px",
              }}
            />
            <span style={{ flex: 1 }}>{user.name}</span>
            { messages?.filter((x) => x.receiverId?.toString() === userId)
                    ?.length + users[0]?.unreadCount !== 0 ? (
              <span
                style={{
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "5px 8px",
                  marginLeft: "10px",
                  fontSize: "12px",
                }}
              >
                {
                  messages?.filter((x) => x.receiverId?.toString() === userId)
                    ?.length + users[0]?.unreadCount
                }
              </span>
           ) : (
              ""
            )} 
            <div style={{ color: "#616161" }}>
              {user?.lastMessage.message !== ""
              ?user?.lastMessage.message:
                 user?.lastMessage?.images?.length > 0
                  ?   <span> <FaCamera /> Image
                  </span>
                  : ""
                 }
            </div>
    
            <div style={{marginLeft:"25px", color: "#616161" }}>
               {user?.lastMessage.currentDate}
            </div>
          </div>
        ))}
      </div>
      {/* Chat component is rendered here */}
      {selectedUser && <Chat selectedUser={selectedUser} userId={userId} />}
    </div>
  );
};

export default UserList;
