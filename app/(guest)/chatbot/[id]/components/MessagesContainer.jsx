import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

const MessagesContainer = ({ messages }) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="bg-gray-100 rounded-lg p-4 min-h-[400px] mb-4 overflow-y-auto max-h-[500px]">
      {messages && messages.length > 0 ? (
        <div className="space-y-2">
          {messages.map((message) => (
            <MessageBubble key={message._id} message={message} />
          ))}
          <div ref={messagesEndRef} />
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