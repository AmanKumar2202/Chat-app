import React, { useEffect, useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';
import SmartReply from './SmartReply';

const ChatContainer = () => {
  const {messages,getMessages,isMessagesLoading,selectedUser, subscribeToMessages, unsubscribeFromMessages}=useChatStore();
  const {authUser} = useAuthStore();
  const [smartReplies, setSmartReplies] = useState([]);
  const messageEndRef = useRef(null);
  const [translations, setTranslations] = useState({});

  //useEffect should run without any conditions so used above if condition
  useEffect(()=>{
    getMessages(selectedUser._id);
    subscribeToMessages();

    return ()=> unsubscribeFromMessages();
  },[selectedUser._id,getMessages,subscribeToMessages,unsubscribeFromMessages])

  useEffect(()=>{
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({behavior:"smooth"})
    } 
  },[messages])

  // Fetch smart replies when a new message is received
  const handleIncomingMessage = (messageText) => {
    fetchSmartReplies(messageText);
  };

  const fetchSmartReplies = async (messageText) => {
    try {
      const res = await fetch("/api/smart-replies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await res.json();
      setSmartReplies(data.replies || []);
    } catch (error) {
      console.error("Error fetching smart replies:", error);
    }
  };

  // Handle reply selection
  const handleReply = (reply) => {
    // Send the selected smart reply as a new message
    const newMessage = {
      _id: Math.random().toString(36).substring(2), // Temporary unique ID for example
      text: reply,
      sender: { _id: authUser._id, profilePic: authUser.profilePic },
      createdAt: new Date(),
      senderId: authUser._id,
    };

    // Add the reply to the messages list (this can be updated with your actual message sending logic)
    getMessages(selectedUser._id); // refresh the message list
  };

  //Translate into english language
    const handleTranslate = async (messageId, text) => {
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setTranslations(prev => ({ ...prev, [messageId]: data.translated }));
    } catch (err) {
      console.error('Translation failed:', err);
    }
  };


  if(isMessagesLoading){ 
    return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>
      <MessageSkeleton/>
      <MessageInput/>
    </div>
    )
  }
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && (
                  <>
                  <p>{message.text}</p>

                  {/* Trigger smart reply suggestions for the incoming message */}
                  {message.senderId !== authUser._id && (
                    <SmartReply 
                      incomingMessage={message.text}
                      onReply={handleReply}
                    />
                  )}
                  </>

              )}
              {message.senderId !== authUser._id && !translations[message._id] && (
                <button
                  className="text-blue-500 text-sm mt-1 hover:underline"
                  onClick={() => handleTranslate(message._id, message.text)}
                >
                  Translate
                </button>
              )}

              {translations[message._id] && (
                <p className="text-sm text-gray-500 mt-1 italic">
                  {translations[message._id]}
                </p>
              )}

            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );

  
}

export default ChatContainer

