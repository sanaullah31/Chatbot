import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

const MessagesContainer = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    // Add a small delay to ensure all content (including markdown) has rendered
    const scrollTimer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    
    return () => clearTimeout(scrollTimer);
  }, [messages]);

  return (
    <div className="w-full h-full">
      {messages && messages.length > 0 ? (
        <div className="space-y-2">
          {messages.map((message) => (
            <MessageBubble key={message._id} message={message} />
          ))}
          <div ref={messagesEndRef} />
          {isLoading && (
            <div className=" text-gray-500 py-2">
              Thinking...
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500 pt-4">
          Start your conversation with the chatbot
        </div>
      )}
    </div>
  );
};

export default MessagesContainer;