import React, { useState } from 'react';

const APP_VERSION = '0.0.0';

const Settings = () => {
  // User Preferences
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [password, setPassword] = useState('');
  const [userMsg, setUserMsg] = useState('');

  // Display
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('md');

  // Notifications
  const [emailNotif, setEmailNotif] = useState(true);
  const [inAppNotif, setInAppNotif] = useState(true);

  // Support
  const [supportOpen, setSupportOpen] = useState(false);
  const [supportMsg, setSupportMsg] = useState('');
  const [supportSent, setSupportSent] = useState(false);

  // Rate
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);

  // Theme effect
  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Font size effect
  React.useEffect(() => {
    document.body.classList.remove('text-sm', 'text-base', 'text-lg');
    if (fontSize === 'sm') document.body.classList.add('text-sm');
    else if (fontSize === 'md') document.body.classList.add('text-base');
    else if (fontSize === 'lg') document.body.classList.add('text-lg');
  }, [fontSize]);

  // Handlers
  const handleUserSave = (e) => {
    e.preventDefault();
    setUserMsg('Changes saved locally!');
    setTimeout(() => setUserMsg(''), 2000);
  };

  const handleSupportSend = (e) => {
    e.preventDefault();
    setSupportSent(true);
    setTimeout(() => {
      setSupportOpen(false);
      setSupportSent(false);
      setSupportMsg('');
    }, 1500);
  };

  return (
    <div className="w-full max-w-[500px] mx-auto px-2 md:max-w-2xl md:px-0 overflow-x-hidden dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg min-h-[80vh] flex flex-col dark:bg-gray-800 dark:text-white transition-colors duration-300">
        <h1 className="text-3xl font-bold mb-8 text-blue-600 dark:text-blue-300">Settings</h1>
        {/* User Preferences */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">User Preferences</h2>
          <form className="bg-gray-50 rounded p-4 flex flex-col gap-4 dark:bg-gray-700" onSubmit={handleUserSave}>
            <div>
              <label className="block text-gray-600 mb-1 dark:text-gray-300">Name</label>
              <input type="text" className="border rounded px-3 py-2 w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 dark:text-gray-300">Email</label>
              <input type="email" className="border rounded px-3 py-2 w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 dark:text-gray-300">Password</label>
              <input type="password" className="border rounded px-3 py-2 w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white" value={password} onChange={e => setPassword(e.target.value)} placeholder="New password" />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition dark:bg-blue-600">Save Changes</button>
            {userMsg && <div className="text-green-600 text-sm mt-1 dark:text-green-400">{userMsg}</div>}
          </form>
        </section>
        {/* Display */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Display</h2>
          <div className="bg-gray-50 rounded p-4 flex flex-col gap-4 dark:bg-gray-700">
            <div className="flex items-center gap-4">
              <span className="font-medium dark:text-gray-200">Theme:</span>
              <button
                className={`px-3 py-1 rounded ${theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600 dark:text-white'}`}
                onClick={() => setTheme('light')}
                type="button"
              >Light</button>
              <button
                className={`px-3 py-1 rounded ${theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600 dark:text-white'}`}
                onClick={() => setTheme('dark')}
                type="button"
              >Dark</button>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium dark:text-gray-200">Font Size:</span>
              <button
                className={`px-3 py-1 rounded ${fontSize === 'sm' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600 dark:text-white'}`}
                onClick={() => setFontSize('sm')}
                type="button"
              >Small</button>
              <button
                className={`px-3 py-1 rounded ${fontSize === 'md' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600 dark:text-white'}`}
                onClick={() => setFontSize('md')}
                type="button"
              >Medium</button>
              <button
                className={`px-3 py-1 rounded ${fontSize === 'lg' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600 dark:text-white'}`}
                onClick={() => setFontSize('lg')}
                type="button"
              >Large</button>
            </div>
          </div>
        </section>
        {/* Notifications */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Notifications</h2>
          <div className="bg-gray-50 rounded p-4 flex flex-col gap-4 dark:bg-gray-700">
            <label className="flex items-center gap-2 dark:text-gray-200">
              <input type="checkbox" checked={emailNotif} onChange={() => setEmailNotif(v => !v)} />
              Email Notifications
            </label>
            <label className="flex items-center gap-2 dark:text-gray-200">
              <input type="checkbox" checked={inAppNotif} onChange={() => setInAppNotif(v => !v)} />
              In-App Notifications
            </label>
          </div>
        </section>
        {/* Support */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Support</h2>
          <div className="bg-gray-50 rounded p-4 flex flex-col gap-4 dark:bg-gray-700">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-fit dark:bg-blue-600" onClick={() => setSupportOpen(true)}>
              Contact Support
            </button>
            {supportOpen && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative dark:bg-gray-800 dark:text-white">
                  <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={() => setSupportOpen(false)}>&times;</button>
                  <h3 className="text-lg font-bold mb-2">Support Request</h3>
                  <form onSubmit={handleSupportSend} className="flex flex-col gap-3">
                    <textarea
                      className="border rounded p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      rows={4}
                      placeholder="Describe your issue or question..."
                      value={supportMsg}
                      onChange={e => setSupportMsg(e.target.value)}
                      required
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition dark:bg-blue-600">Send</button>
                  </form>
                  {supportSent && <div className="text-green-600 mt-2 dark:text-green-400">Support request sent!</div>}
                </div>
              </div>
            )}
          </div>
        </section>
        {/* About */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">About</h2>
          <div className="bg-gray-50 rounded p-4 text-gray-600 dark:bg-gray-700 dark:text-gray-200">
            <div>App Version: <span className="font-mono">{APP_VERSION}</span></div>
            <div>Developer: <span className="font-semibold">Your Name</span></div>
            <div>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Documentation</a>
            </div>
          </div>
        </section>
        {/* Rate */}
        <div className="mt-auto pt-8">
          <section className="text-center">
            <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Rate</h2>
            <div className="bg-gray-50 rounded p-4 text-gray-600 flex flex-col items-center dark:bg-gray-700 dark:text-gray-200">
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(star => (
                  <button
                    key={star}
                    className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    onClick={() => { setRating(star); setRated(true); }}
                    type="button"
                  >★</button>
                ))}
              </div>
              {rated && <div className="text-green-600 dark:text-green-400">Thank you for rating!</div>}
              {!rated && <div className="text-gray-500 text-sm dark:text-gray-300">Tap a star to rate</div>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings; 