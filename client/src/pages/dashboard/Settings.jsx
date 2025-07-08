import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/context';
import { toast } from 'react-toastify';

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 60%)`;
  return color;
}

const Settings = () => {
  const { userData } = useContext(AppContext);
  const [name, setName] = useState(userData?.name || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');

  const avatarBg = stringToColor(name + email);
  const avatarLetter = name.charAt(0).toUpperCase();

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Settings saved (demo only)');
    }, 1000);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (deleteConfirm === 'DELETE') {
      toast.error('Account deleted (demo only)');
      setShowDelete(false);
      setDeleteConfirm('');
    } else {
      toast.error('Type DELETE to confirm');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-0 flex flex-col gap-8">
      {/* Profile summary */}
      <div className="flex items-center gap-6 border-b border-gray-100 px-8 py-8">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg" style={{ background: avatarBg }}>
          {avatarLetter}
        </div>
        <div>
          <div className="text-xl font-semibold text-gray-800">{name}</div>
          <div className="text-gray-500">{email}</div>
        </div>
      </div>
      {/* Settings form */}
      <form className="flex flex-col gap-4 px-8" onSubmit={handleSave}>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Password <span className="text-gray-400 text-xs">(leave blank to keep current)</span></label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 mt-2 disabled:opacity-60 w-40 self-end"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
      {/* Delete account section */}
      <div className="border-t border-gray-100 px-8 py-8 flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-red-600 mb-1">Danger Zone</h3>
        <p className="text-gray-600 mb-2">Delete your account and all associated data. This action cannot be undone.</p>
        {showDelete ? (
          <form className="flex flex-col gap-2" onSubmit={handleDelete}>
            <label className="text-sm text-gray-700">Type <span className="font-bold">DELETE</span> to confirm:</label>
            <input
              type="text"
              className="w-40 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-200"
              value={deleteConfirm}
              onChange={e => setDeleteConfirm(e.target.value)}
            />
            <div className="flex gap-2 mt-1">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1 rounded transition-colors duration-200"
              >
                Confirm Delete
              </button>
              <button
                type="button"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1 rounded transition-colors duration-200"
                onClick={() => { setShowDelete(false); setDeleteConfirm(''); }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold px-6 py-2 rounded-lg transition-colors duration-200 w-40"
            onClick={() => setShowDelete(true)}
          >
            Delete Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings; 