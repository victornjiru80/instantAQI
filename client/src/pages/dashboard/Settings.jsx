import React from 'react';

const Settings = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg min-h-[80vh] flex flex-col">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Settings</h1>
      {/* User Preferences */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">User Preferences</h2>
        <div className="bg-gray-50 rounded p-4 text-gray-600">Customize your experience and preferences here.</div>
      </section>
      {/* Display */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">Display</h2>
        <div className="bg-gray-50 rounded p-4 text-gray-600">Adjust display settings such as theme and font size.</div>
      </section>
      {/* Notifications */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">Notifications</h2>
        <div className="bg-gray-50 rounded p-4 text-gray-600">Manage notification preferences and alerts.</div>
      </section>
      {/* Support */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">Support</h2>
        <div className="bg-gray-50 rounded p-4 text-gray-600">Need help? Contact support or visit our help center.</div>
      </section>
      {/* About */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">About</h2>
        <div className="bg-gray-50 rounded p-4 text-gray-600">Learn more about this app and its creators.</div>
      </section>
      {/* Rate */}
      <div className="mt-auto pt-8">
        <section className="text-center">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Rate</h2>
          <div className="bg-gray-50 rounded p-4 text-gray-600">Enjoying the app? Rate us!</div>
        </section>
      </div>
    </div>
  );
};

export default Settings; 