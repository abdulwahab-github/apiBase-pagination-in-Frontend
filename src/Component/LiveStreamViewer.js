import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// Initialize socket connection
const socket = io("https://backend.iimiin.com/");

const LiveStreamViewer = ({ streamId, no }) => {
  const [viewerCount, setViewerCount] = useState(0);
  const [viewers, setViewers] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [auctionDuration, setAuctionDuration] = useState();
  const [setDuration, setSetDuration] = useState("");
  const [error, setError] = useState("");
  const [bidAmount, setBidAmount] = useState(""); // Bid input
  const [highestBid, setHighestBid] = useState(0); // Highest bid
  const [reservePrice, setReservePrice] = useState(""); // Reserve price input
  const userId = localStorage.getItem("user");

  useEffect(() => {
    if (!userId || !streamId) return;

    setComments([]);
    setAuctionDuration(0);

    socket.emit("authenticate", userId);
    socket.emit("joinStream", { streamId, userId });
    socket.emit("joinReact", { streamId });

    const handleViewerCountUpdate = ({ streamId: id, count }) => {
      if (id === streamId) {
        setViewerCount(count);
      }
    };

    const handleViewerDetailsUpdate = ({ streamId: id, viewers }) => {
      if (id === streamId) {
        setViewers(viewers);
      }
    };

    const handleCommentUpdate = ({ streamId: id, comment }) => {
      if (id === streamId) {
        setComments((prevComments) => [...prevComments, comment]);
      }
    };

    const handleAuctionCountdownUpdate = ({ streamId: id, duration }) => {
      if (id === streamId) {
        console.log(duration, "duration");
        if (duration == 0) {
          socket.emit("chooseAuctionWinner", { streamId, productId:"67233f85ad9c4de0fe5aecbc" });
        }
        setAuctionDuration(duration);
      }
    };

    const handleBidUpdate = ({ streamId: id, highestBid }) => {
      if (id === streamId) {
        setHighestBid(highestBid); // Update the highest bid on screen
      }
    };

    const handleReservePriceUpdate = ({ streamId: id, reservePrice }) => {
      if (id === streamId) {
        setReservePrice(reservePrice); // Update the reserve price on screen
      }
    };

    const handleError = ({ message }) => {
      setError(message);
    };
    socket.on("randomWinner", ({ streamId, user, giveAwayProduct }) => {
      console.log("Random winner received:", { streamId, user, giveAwayProduct });
      // setWinner({ streamId, user, giveAwayProduct });
    });
    socket.on("viewerCountUpdate", handleViewerCountUpdate);
    socket.on("viewerDetailsUpdate", handleViewerDetailsUpdate);
    socket.on("commentUpdate", handleCommentUpdate);
    socket.on("auctionCountdownUpdate", handleAuctionCountdownUpdate);
    socket.on("bidUpdate", handleBidUpdate);
    socket.on("reservePriceUpdate", handleReservePriceUpdate); // Listen for reserve price updates
    socket.on("error", handleError);

    const handleBeforeUnload = () => {
      socket.emit("leaveStream", { streamId, userId });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      socket.emit("leaveStream", { streamId, userId });
      window.removeEventListener("beforeunload", handleBeforeUnload);
      socket.off("viewerCountUpdate", handleViewerCountUpdate);
      socket.off("viewerDetailsUpdate", handleViewerDetailsUpdate);
      socket.off("commentUpdate", handleCommentUpdate);
      socket.off("auctionCountdownUpdate", handleAuctionCountdownUpdate);
      socket.off("bidUpdate", handleBidUpdate);
      socket.off("reservePriceUpdate", handleReservePriceUpdate); // Clean up reserve price listener
      socket.off("error", handleError);
      socket.off("randomWinner");

    };
  }, [userId, streamId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      socket.emit("newComment", { streamId, userId, comment: newComment });
      setNewComment("");
    }
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const bid = parseFloat(bidAmount);

    if (!bid || bid <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }

    if (bid <= highestBid) {
      alert("Bid must be higher than the current highest bid.");
      return;
    }

    if (reservePrice && bid < parseFloat(reservePrice)) {
      alert("Bid must meet or exceed the reserve price.");
      return;
    }

    // Emit bid to the server
    socket.emit("userPlaceBid", { streamId, userId, bidAmount: bid });
    setBidAmount(""); // Clear bid input after submission

    // Optionally, show a success message
  };

  const handleReservePriceSubmit = (e) => {
    e.preventDefault();
    if (parseFloat(reservePrice) > 0) {
      socket.emit("placeReservePrice", {
        streamId,
        userId,
        reservePrice: parseFloat(reservePrice),
      });
      setReservePrice("");
    } else {
      alert("Please enter a valid reserve price.");
    }
  };

  const handleSetAuctionDuration = (e) => {
    e.preventDefault();
    socket.emit("setAuctionDuration", { streamId, duration: setDuration });
    setSetDuration("");
  };

  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div>
      <h1>Live Stream no {no}</h1>
      <p>Current viewers: {viewerCount}</p>
      <p>Auction Duration: {formatDuration(auctionDuration || 0)} seconds</p>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSetAuctionDuration}>
        <input
          type="text"
          value={setDuration}
          onChange={(e) => setSetDuration(e.target.value)}
          placeholder="Set auction duration (e.g., '4 hours 30 mins')"
        />
        <button type="submit">Set Duration</button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <h3>Place Your Bid</h3>
        <form onSubmit={handleBidSubmit}>
          <input
            type="text"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder="Enter your bid amount"
          />
          <button type="submit">Place Bid</button>
        </form>
        <p>Current Highest Bid: ${highestBid}</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Set Reserve Price</h3>
        <form onSubmit={handleReservePriceSubmit}>
          <input
            type="text"
            value={reservePrice}
            onChange={(e) => setReservePrice(e.target.value)}
            placeholder="Enter reserve price"
          />
          <button type="submit">Set Reserve Price</button>
        </form>
        <p>Reserve Price: ${reservePrice}</p> {/* Display the reserve price */}
      </div>

      <ul>
        {viewers.length > 0 ? (
          viewers.map((viewer) => (
            <li key={viewer.userId}>
              <img
                style={{ borderRadius: "50px" }}
                src={`https://backend.iimiin.com/uploads/${viewer.image}`}
                alt={viewer.name}
                width="50"
                height="50"
              />
              <span style={{ padding: "0px 10px" }}>{viewer.name}</span>
              <button>{viewer?.isFollowed ? "message" : "follow"}</button>
            </li>
          ))
        ) : (
          <p>No viewers to display</p>
        )}
      </ul>

      <div style={{ marginTop: "20px" }}>
        <h3>Comments</h3>
        <ul>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <img
                  style={{ borderRadius: "50px" }}
                  src={`https://backend.iimiin.com/uploads/${comment.user.image}`}
                  alt={comment.user.name}
                  width="50"
                  height="50"
                />
                <span style={{ padding: "0px 10px" }}>{comment.user.name}</span>
                <p>{comment.comment}</p>
              </li>
            ))
          ) : (
            <p>No comments yet</p>
          )}
        </ul>

        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Enter your comment"
          />
          <button type="submit">Submit Comment</button>
        </form>
      </div>
    </div>
  );
};

export default LiveStreamViewer;
