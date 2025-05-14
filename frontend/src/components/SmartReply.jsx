import React, { useState, useEffect } from "react";

const SmartReply = ({ incomingMessage, onReply }) => {
  const [smartReplies, setSmartReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!incomingMessage) return;

    // Function to fetch smart replies from the backend
    const fetchSmartReplies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/smart-replies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: incomingMessage }),
        });

        const data = await response.json();
        setSmartReplies(data.replies || []);
      } catch (error) {
        console.error("Error fetching smart replies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSmartReplies();
  }, [incomingMessage]);

  return (
    <div className="flex flex-col space-y-2 mt-3">
      {isLoading ? (
        <div className="text-sm text-gray-500">Loading suggestions...</div>
      ) : (
        <>
          {smartReplies.length > 0 ? (
            <div className="flex gap-2">
              {/* Display the smart reply suggestions */}
              {smartReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => onReply(reply)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  {reply}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500">No suggestions available.</div>
          )}
        </>
      )}
    </div>
  );
};

export default SmartReply;
