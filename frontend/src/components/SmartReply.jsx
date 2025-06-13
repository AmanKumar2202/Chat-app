import React, { useState, useEffect } from "react";

const SmartReply = ({ incomingMessage, onReply, replies }) => {
  const [smartReplies, setSmartReplies] = useState(replies || []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If replies are passed as props, use them directly and skip fetch
    if (replies && replies.length > 0) {
      setSmartReplies(replies);
      return;
    }

    // If no incoming message, exit
    if (!incomingMessage || replies?.length > 0) return;

    // Function to fetch smart replies from the backend
    const fetchSmartReplies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/smart-replies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: incomingMessage }),
        })
          .then((res) => res.json())
          .then(console.log);

        const data = await response.json();
        setSmartReplies(data.replies || []);
      } catch (error) {
        console.error("Error fetching smart replies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSmartReplies();
  }, [incomingMessage, replies]);
  if (isLoading) {
    return (
      <div className="text-sm text-gray-500 mt-2">Loading suggestions...</div>
    );
  }

  if (smartReplies.length === 0) {
    return (
      <div className="text-sm text-gray-400 mt-2">
        No suggestions available.
      </div>
    );
  }

  return (
    <div className="flex gap-2 mt-3 flex-wrap">
      {smartReplies.map((reply, idx) => (
        <button
          key={idx}
          onClick={() => onReply(reply)}
          className="bg-blue-500 text-white py-1 px-3 rounded-lg text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {reply}
        </button>
      ))}
    </div>
  );
};

export default SmartReply;
