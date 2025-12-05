import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCamera, FaEdit, FaSave, FaTimes, FaArrowLeft, FaEnvelope, FaPhone, FaMapMarkerAlt, FaShoppingBag, FaHeart, FaHome } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const MyProfile = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.avatar || "https://ui-avatars.com/api/?name=John+Doe&size=200&background=random");
  const [profileData, setProfileData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    phone: "+1 234 567 8900",
    address: "123 Main Street, New York, NY 10001",
    bio: "Love shopping for fresh organic products! 🍎🥑"
  });

  const [tempData, setTempData] = useState({...profileData});

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        updateProfile({ avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTempData({...profileData});
  };

  const handleSave = () => {
    setProfileData(tempData);
    localStorage.setItem('userProfile', JSON.stringify(tempData));
    updateProfile({ name: tempData.name });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData({...profileData});
    setIsEditing(false);
  };

  const stats = [
    { label: "Orders", value: 12, color: "from-blue-500 to-cyan-600", icon: FaShoppingBag },
    { label: "Wishlist", value: 8, color: "from-pink-500 to-red-600", icon: FaHeart },
    { label: "Addresses", value: 3, color: "from-green-500 to-emerald-600", icon: FaMapMarkerAlt }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white shadow-2xl">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-all"
              >
                <FaArrowLeft />
              </button>
              <div>
                <h1 className="text-3xl font-bold">My Profile</h1>
                <p className="text-sm opacity-90">Manage your account settings</p>
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

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-purple-500 shadow-xl">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="absolute bottom-0 right-1/2 translate-x-16 bg-gradient-to-r from-orange-500 to-red-600 text-white p-3 rounded-full cursor-pointer hover:shadow-lg hover:scale-110 transition-all">
                  <FaCamera />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Name & Email */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                <p className="text-gray-600">{profileData.email}</p>
                <div className="mt-3 inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  ⭐ Premium Member
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-3 mb-6">
                {stats.map((stat, index) => (
                  <div key={index} className={`bg-gradient-to-r ${stat.color} text-white rounded-xl p-4 flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                      <stat.icon className="text-2xl" />
                      <span className="font-semibold">{stat.label}</span>
                    </div>
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Logout Button */}
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <FaEdit />
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <FaSave />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-all flex items-center gap-2"
                    >
                      <FaTimes />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-4 text-gray-400" />
                    <input
                      type="text"
                      value={isEditing ? tempData.name : profileData.name}
                      onChange={(e) => setTempData({...tempData, name: e.target.value})}
                      disabled={!isEditing}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                        isEditing ? 'border-gray-300 focus:border-orange-500' : 'border-gray-200 bg-gray-50'
                      }`}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                    <input
                      type="email"
                      value={isEditing ? tempData.email : profileData.email}
                      onChange={(e) => setTempData({...tempData, email: e.target.value})}
                      disabled={!isEditing}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                        isEditing ? 'border-gray-300 focus:border-orange-500' : 'border-gray-200 bg-gray-50'
                      }`}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-4 text-gray-400" />
                    <input
                      type="tel"
                      value={isEditing ? tempData.phone : profileData.phone}
                      onChange={(e) => setTempData({...tempData, phone: e.target.value})}
                      disabled={!isEditing}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                        isEditing ? 'border-gray-300 focus:border-orange-500' : 'border-gray-200 bg-gray-50'
                      }`}
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />
                    <textarea
                      value={isEditing ? tempData.address : profileData.address}
                      onChange={(e) => setTempData({...tempData, address: e.target.value})}
                      disabled={!isEditing}
                      rows={3}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                        isEditing ? 'border-gray-300 focus:border-orange-500' : 'border-gray-200 bg-gray-50'
                      }`}
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={isEditing ? tempData.bio : profileData.bio}
                    onChange={(e) => setTempData({...tempData, bio: e.target.value})}
                    disabled={!isEditing}
                    rows={3}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                      isEditing ? 'border-gray-300 focus:border-orange-500' : 'border-gray-200 bg-gray-50'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "My Orders", icon: FaShoppingBag, color: "from-blue-500 to-cyan-600", link: "/myorders" },
                  { label: "Wishlist", icon: FaHeart, color: "from-pink-500 to-red-600", link: "/wishlist" },
                  { label: "Addresses", icon: FaMapMarkerAlt, color: "from-green-500 to-emerald-600", link: "/addresses" },
                  { label: "Settings", icon: FaEdit, color: "from-purple-500 to-pink-600", link: "/settings" }
                ].map((action, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(action.link)}
                    className={`bg-gradient-to-r ${action.color} text-white p-6 rounded-xl hover:shadow-xl hover:scale-105 transition-all`}
                  >
                    <action.icon className="text-3xl mx-auto mb-2" />
                    <p className="font-semibold">{action.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
