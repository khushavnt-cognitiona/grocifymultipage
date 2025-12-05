import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaPlus, FaEdit, FaTrash, FaArrowLeft, FaHome, FaCheckCircle } from "react-icons/fa";

const SavedAddresses = () => {
  const navigate = useNavigate();
  
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      name: "John Doe",
      phone: "+1 234 567 8900",
      address: "123 Main Street, Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      isDefault: true
    },
    {
      id: 2,
      type: "Office",
      name: "John Doe",
      phone: "+1 987 654 3210",
      address: "456 Business Park, Suite 200",
      city: "New York",
      state: "NY",
      zip: "10005",
      isDefault: false
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: "Home",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };

  const handleSetDefault = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    const id = addresses.length + 1;
    setAddresses([...addresses, { ...newAddress, id }]);
    setShowForm(false);
    setNewAddress({
      type: "Home",
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      isDefault: false
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
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
                  <FaMapMarkerAlt /> My Addresses
                </h1>
                <p className="text-sm opacity-90">Manage your delivery locations</p>
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

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Add New Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full md:w-auto mb-8 bg-white border-2 border-dashed border-green-500 text-green-600 px-8 py-4 rounded-2xl font-bold hover:bg-green-50 transition-all flex items-center justify-center gap-2"
          >
            <FaPlus /> Add New Address
          </button>
        )}

        {/* Add Address Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 animate-slideDown">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Add New Address</h3>
            <form onSubmit={handleAddAddress} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Address Type</label>
                <select
                  value={newAddress.type}
                  onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                >
                  <option>Home</option>
                  <option>Office</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
                <input
                  type="text"
                  required
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  required
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ZIP Code</label>
                <input
                  type="text"
                  required
                  value={newAddress.zip}
                  onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                />
              </div>
              
              <div className="md:col-span-2 flex gap-4 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-all"
                >
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Address List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div 
              key={addr.id} 
              className={`bg-white rounded-2xl p-6 border-2 transition-all hover:shadow-xl ${
                addr.isDefault ? 'border-green-500 shadow-md' : 'border-gray-100 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  addr.type === 'Home' ? 'bg-blue-100 text-blue-700' : 
                  addr.type === 'Office' ? 'bg-purple-100 text-purple-700' : 
                  'bg-gray-100 text-gray-700'
                }`}>
                  {addr.type}
                </span>
                {addr.isDefault && (
                  <span className="flex items-center gap-1 text-green-600 text-sm font-bold">
                    <FaCheckCircle /> Default
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1">{addr.name}</h3>
              <p className="text-gray-600 mb-1">{addr.address}</p>
              <p className="text-gray-600 mb-3">{addr.city}, {addr.state} {addr.zip}</p>
              <p className="text-gray-600 text-sm font-mono mb-6">{addr.phone}</p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                {!addr.isDefault && (
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    className="text-sm font-semibold text-gray-500 hover:text-green-600"
                  >
                    Set as Default
                  </button>
                )}
                <div className="flex-1"></div>
                <button className="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-all">
                  <FaEdit />
                </button>
                <button 
                  onClick={() => handleDelete(addr.id)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedAddresses;
