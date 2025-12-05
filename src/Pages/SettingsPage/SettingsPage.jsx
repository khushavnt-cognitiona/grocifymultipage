import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCog, FaBell, FaLock, FaMoon, FaGlobe, FaArrowLeft, FaHome, FaToggleOn, FaToggleOff } from "react-icons/fa";

const SettingsPage = () => {
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      orders: true,
      promotions: false
    },
    privacy: {
      profileVisibility: "Public",
      showActivity: true
    },
    appearance: {
      darkMode: false,
      compactMode: false
    },
    language: "English"
  });

  const toggleSetting = (category, key) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [key]: !settings[category][key]
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-all"
              >
                <FaArrowLeft />
              </button>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <FaCog /> Settings
                </h1>
                <p className="text-sm opacity-90">Manage your preferences</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all flex items-center gap-2"
            >
              <FaHome />
              <span className="hidden md:inline">Home</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        
        {/* Notifications Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
              <FaBell className="text-orange-500" /> Notifications
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {[
              { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
              { key: 'push', label: 'Push Notifications', desc: 'Receive updates on your device' },
              { key: 'sms', label: 'SMS Notifications', desc: 'Receive updates via text message' },
              { key: 'orders', label: 'Order Updates', desc: 'Get notified about order status' },
              { key: 'promotions', label: 'Promotional Emails', desc: 'Receive offers and deals' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <button
                  onClick={() => toggleSetting('notifications', item.key)}
                  className={`text-3xl transition-colors ${
                    settings.notifications[item.key] ? 'text-green-500' : 'text-gray-300'
                  }`}
                >
                  {settings.notifications[item.key] ? <FaToggleOn /> : <FaToggleOff />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
              <FaLock className="text-blue-500" /> Security
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">Change Password</p>
                <p className="text-sm text-gray-500">Update your account password</p>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-semibold text-sm">
                Update
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Add an extra layer of security</p>
              </div>
              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all font-semibold text-sm">
                Enable
              </button>
            </div>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
              <FaMoon className="text-purple-500" /> Appearance
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">Dark Mode</p>
                <p className="text-sm text-gray-500">Switch to dark theme</p>
              </div>
              <button
                onClick={() => toggleSetting('appearance', 'darkMode')}
                className={`text-3xl transition-colors ${
                  settings.appearance.darkMode ? 'text-purple-500' : 'text-gray-300'
                }`}
              >
                {settings.appearance.darkMode ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>
          </div>
        </div>

        {/* Language Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
              <FaGlobe className="text-teal-500" /> Language & Region
            </h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">Language</p>
                <p className="text-sm text-gray-500">Select your preferred language</p>
              </div>
              <select
                value={settings.language}
                onChange={(e) => setSettings({...settings, language: e.target.value})}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all">
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
