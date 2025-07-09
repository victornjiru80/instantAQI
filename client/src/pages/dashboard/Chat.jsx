import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/chat-messages`);
      setMessages(res.data);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to load messages');
      setLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!user.trim() || !message.trim()) {
      toast.error('Enter your name and a message');
      return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/chat-messages`, { user, message });
      setMessages((prev) => [...prev, res.data]);
      setMessage('');
    } catch (err) {
      toast.error('Failed to send message');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto flex flex-col h-[80vh]">
      <h1 className="text-2xl font-bold mb-4">Global Chat</h1>
      <div className="flex-1 overflow-y-auto bg-gray-50 rounded p-4 mb-4 border">
        {loading ? (
          <div>Loading...</div>
        ) : (
          messages.map((msg, idx) => (
            <div key={msg._id || idx} className="mb-2">
              <span className="font-semibold text-blue-600 mr-2">{msg.user}:</span>
              <span>{msg.message}</span>
              <span className="text-xs text-gray-400 ml-2">{new Date(msg.createdAt).toLocaleTimeString()}</span>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          placeholder="Your name"
          value={user}
          onChange={e => setUser(e.target.value)}
          className="border px-2 py-1 rounded w-32"
        />
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="border px-2 py-1 rounded flex-1"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 active:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat; 