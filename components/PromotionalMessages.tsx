import React from 'react';

interface PromotionalMessagesProps {
  messages?: string[];
  speed?: 'slow' | 'normal' | 'fast';
  backgroundColor?: string;
  textColor?: string;
}

const PromotionalMessages = ({
  messages = [
    "Enjoy Free Shipping on all orders above LKR 5000",
    "|",
    "New Arrivals are live! Dive into our newest drop filled with unique colors",
    "|",
    "Enjoy Free Shipping on all orders above LKR 5000",
    "|"
    ,
  ],
  speed = 'normal',
  backgroundColor = 'bg-black',
  textColor = 'text-white'
}: PromotionalMessagesProps) => {
  // Calculate animation duration based on speed
  const getDuration = () => {
    switch (speed) {
      case 'slow': return '30s';
      case 'fast': return '10s';
      default: return '20s';
    }
  };

  // Create a unique key based on messages to ensure re-rendering
  const messagesKey = messages.join('-');

  return (
    <div 
      key={messagesKey}
      className={`promotional-bar overflow-hidden whitespace-nowrap py-2 ${backgroundColor} ${textColor}`}
    >
      <div 
        className="animate-marquee inline-block"
        style={{ 
          animationDuration: getDuration()
        }}
      >
        {messages.map((message, index) => (
          <span key={index} className="mx-4 text-sm md:text-base">
            {message}
          </span>
        ))}
      </div>
      {/* Duplicate the content for seamless looping */}
      <div 
        className="animate-marquee inline-block"
        style={{ 
          animationDuration: getDuration(),
          animationDelay: `-${getDuration()}`
        }}
      >
        {messages.map((message, index) => (
          <span key={`dup-${index}`} className="mx-4 text-sm md:text-base">
            {message}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PromotionalMessages;