import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Invite = () => {
  const [inviteLink, setInviteLink] = useState('');
  const [copied, setCopied] = useState(false);

  const fetchInviteLink = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/invite-link`);
      setInviteLink(res.data.inviteLink);
    } catch (err) {
      toast.error('Failed to get invite link');
    }
  };

  const handleCopy = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl text-muted-foreground mb-4">Invite Someone</h1>
      <p className="mb-4">Generate a link you can send to someone to join InstantAQI.</p>
      <button
        onClick={fetchInviteLink}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:bg-blue-700 transition mb-4"
      >
        Generate Invite Link
      </button>
      {inviteLink && (
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={inviteLink}
            readOnly
            className="border px-2 py-1 rounded w-full text-sm"
          />
          <button
            onClick={handleCopy}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 active:bg-blue-700 text-sm"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Invite; 