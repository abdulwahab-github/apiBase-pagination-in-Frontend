import axios from "axios";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { MdDelete } from "react-icons/md";

const socket = io("https://backend.iimiin.com/");

const Chat = ({ selectedUser, userId }) => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const fetchChats = async () => {
    if (selectedUser) {
      try {
        const response = await axios.get(`https://backend.iimiin.com/history/${userId}/${selectedUser.userId}`);
        setMessages(response.data.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    }
  };

  useEffect(() => {
    console.log("  ffffffffffffffffffffffffff");

    fetchChats();

    socket.on("connection", () => {
      console.log("Connected to socket server");
    });

    socket.emit("joinChat", { id: selectedUser.userId });

    socket.on("receiveMessage", (message) => {
      console.log(message,"message");
      
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Real-time delete message listener
    socket.on("messageDeleted", (chatId) => {
      // Remove the deleted message from the UI
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== chatId)
      );
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("messageDeleted");
      socket.off("connect");
    };
  }, [selectedUser, userId]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    setSelectedImages((prevImages) => [...prevImages, ...Array.from(files)]);
  };

  const handleSendMessage = (e) => {
    if (!messageInput.trim() || !selectedUser) {
      console.log("Empty message not sent");
      return;
    }

    const formData = new FormData();
    formData.append("senderId", userId);
    formData.append("receiverId", selectedUser.userId);
    formData.append("message", messageInput);

    selectedImages.forEach((image) => {
      formData.append("image", image);
    });

    axios.post("https://backend.iimiin.com/sendMsg", formData)
      .then((res) => {
        setMessageInput('');
        setSelectedImages([]);
        const messageData = res.data.data;
        socket.emit("newMessage", messageData);
        socket.emit("sendMessage", messageData); // Emit the message
      })
      .catch((err) => {
        console.log(err, "Error sending message");
      });
  };
  // Assuming you have initialized socket.io
  
  const deleteChat = (chatId, senderId, receiverId) => {
    console.log(chatId, "chatId");
    
    axios.delete(`https://backend.iimiin.com/deleteChat/${chatId}`).then((res) => {
      console.log("Chat Deleted", res.data);
  
      // Emit a socket event to notify both sender and receiver of the deleted chat
      socket.emit("deleteMessage", { chatId, senderId, receiverId });
  
      // Fetch the updated chat list
      fetchChats();
      
    }).catch((err) => {
      console.log(err);
    });
  };
  
  return (
    <div style={{ width: "70%", paddingLeft: "10px" }}>
      <div
        id="chatArea"
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          height: "500px",
          overflowY: "auto",
          backgroundColor: "#f0f0f0",
        }}
      >
        {messages.map((msg, index) => {
          const isSender = msg.senderId === userId;
          return (
            <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: isSender ? "flex-end" : "flex-start", marginBottom: "10px" }}>
              {msg.images && msg.images.length > 0 && msg.images.map((img, imgIndex) => (
                <div key={imgIndex} style={{ marginBottom: "5px" }}>
                  <img
                    style={{ width: "100px", borderRadius: "5px", marginBottom: "5px" }}
                    src={img}
                    alt={`Image ${imgIndex}`}
                  />
                  <>:</>
                </div>
              ))}
              <div
                style={{
                  backgroundColor: isSender ? "#dcf8c6" : "#fff",
                  padding: "15px",
                  borderRadius: "10px",
                  maxWidth: "60%",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                  position: "relative",
                }}
              >

                <span style={{ color: "#333" }}>{msg.message}</span>
                <span
                  style={{
                    fontSize: "10px",
                    color: "#999",
                    position: "absolute",
                    top: "38px",
                    right: "8px",
                  }}
                >
                  {msg?.currentTime}
                </span>
              </div>
              {msg?.senderId?.toString() === userId ? 
              <div onClick={()=>deleteChat(msg?._id,msg?.senderId,msg?.receiverId)}><MdDelete /></div>
             :""}
            </div>
          );
        })}
      </div>

      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Type a message"
        style={{ width: "80%", marginRight: "10px" }}
      />
      <input type="file" onChange={handleImageChange} multiple />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
