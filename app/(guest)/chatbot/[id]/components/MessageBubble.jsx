import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { format } from 'timeago.js';

const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';
  
  // Format the timestamp
  const timeAgo = message.created_at ? format(new Date(message.created_at)) : '';
  
  // Custom components for markdown rendering
  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={tomorrow}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
  };
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className="max-w-[80%]">
        {/* Message Bubble */}
        <div 
          className={`rounded-lg p-3 ${
            isUser 
              ? 'bg-blue-600 text-white rounded-br-none' 
              : 'bg-gray-200 text-gray-800 rounded-bl-none'
          }`}
        >
          {isUser ? (
            // Regular text for user messages
            <span>{message.content}</span>
          ) : (
            // Markdown rendering for AI responses with syntax highlighting
            <div className="markdown-content">
              <ReactMarkdown components={components}>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
        
        {/* Timestamp */}
        <div 
          className={`text-xs mt-1 text-gray-500 ${
            isUser ? 'text-right mr-1' : 'ml-1'
          }`}
        >
          {timeAgo}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble; 