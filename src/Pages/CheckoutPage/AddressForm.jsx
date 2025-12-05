import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaUser, FaPhone, FaHome, FaBuilding, FaCheckCircle } from "react-icons/fa";

const AddressForm = ({ onAddressComplete, savedAddresses = [] }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    addressType: "home"
  });

  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Real-time validation
  useEffect(() => {
    const validateField = (field, value) => {
      switch (field) {
        case 'fullName':
          return value.length >= 3;
        case 'phone':
          return /^[0-9]{10}$/.test(value);
        case 'zipCode':
          return /^[0-9]{6}$/.test(value);
        case 'address':
          return value.length >= 10;
        case 'city':
        case 'state':
          return value.length >= 2;
        default:
          return true;
      }
    };

    const newStatus = {};
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        newStatus[key] = validateField(key, formData[key]);
      }
    });
    setValidationStatus(newStatus);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectSavedAddress = (address) => {
    setSelectedAddress(address);
    setFormData(address);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsValidating(true);
    
    // Simulate real-time validation
    setTimeout(() => {
      setIsValidating(false);
      onAddressComplete && onAddressComplete(formData);
    }, 1500);
  };

  const isFormValid = Object.keys(formData).every(key => 
    key === 'addressType' || (formData[key] && validationStatus[key])
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-xl">
          <FaMapMarkerAlt className="text-white text-2xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Delivery Address</h2>
          <p className="text-sm text-gray-600">Where should we deliver your order?</p>
        </div>
      </div>

      {/* Saved Addresses */}
      {savedAddresses.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Saved Addresses</h3>
          <div className="grid gap-3">
            {savedAddresses.map((addr, index) => (
              <button
                key={index}
                onClick={() => handleSelectSavedAddress(addr)}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  selectedAddress === addr
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {addr.addressType === 'home' ? <FaHome /> : <FaBuilding />}
                    <div>
                      <p className="font-semibold">{addr.fullName}</p>
                      <p className="text-sm text-gray-600">{addr.address}, {addr.city}</p>
                    </div>
                  </div>
                  {selectedAddress === addr && (
                    <FaCheckCircle className="text-green-500 text-xl" />
                  )}
                </div>
              </button>
            ))}
          </div>
          <div className="my-4 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or add new address</span>
            </div>
          </div>
        </div>
      )}

      {/* Address Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Address Type */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setFormData({...formData, addressType: 'home'})}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-semibold transition-all ${
              formData.addressType === 'home'
                ? "border-orange-500 bg-orange-50 text-orange-600"
                : "border-gray-300 text-gray-600 hover:border-gray-400"
            }`}
          >
            <FaHome />
            Home
          </button>
          <button
            type="button"
            onClick={() => setFormData({...formData, addressType: 'office'})}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-semibold transition-all ${
              formData.addressType === 'office'
                ? "border-orange-500 bg-orange-50 text-orange-600"
                : "border-gray-300 text-gray-600 hover:border-gray-400"
            }`}
          >
            <FaBuilding />
            Office
          </button>
        </div>

        {/* Full Name */}
        <div className="relative">
          <FaUser className="absolute left-4 top-4 text-gray-400" />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-all ${
              formData.fullName && (validationStatus.fullName ? 'border-green-500' : 'border-red-500')
            } ${!formData.fullName && 'border-gray-300 focus:border-orange-500'}`}
          />
          {formData.fullName && (
            <div className="absolute right-4 top-4">
              {validationStatus.fullName ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <span className="text-red-500 text-xl">✗</span>
              )}
            </div>
          )}
        </div>

        {/* Phone */}
        <div className="relative">
          <FaPhone className="absolute left-4 top-4 text-gray-400" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number (10 digits)"
            required
            maxLength={10}
            className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-all ${
              formData.phone && (validationStatus.phone ? 'border-green-500' : 'border-red-500')
            } ${!formData.phone && 'border-gray-300 focus:border-orange-500'}`}
          />
          {formData.phone && (
            <div className="absolute right-4 top-4">
              {validationStatus.phone ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <span className="text-red-500 text-xl">✗</span>
              )}
            </div>
          )}
        </div>

        {/* Address */}
        <div className="relative">
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Full Address (House No, Street, Area)"
            required
            rows={3}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
              formData.address && (validationStatus.address ? 'border-green-500' : 'border-red-500')
            } ${!formData.address && 'border-gray-300 focus:border-orange-500'}`}
          />
          {formData.address && (
            <div className="absolute right-4 top-4">
              {validationStatus.address ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <span className="text-red-500 text-xl">✗</span>
              )}
            </div>
          )}
        </div>

        {/* City, State, Zip */}
        <div className="grid grid-cols-3 gap-3">
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required
            className={`px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
              formData.city && (validationStatus.city ? 'border-green-500' : 'border-red-500')
            } ${!formData.city && 'border-gray-300 focus:border-orange-500'}`}
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            required
            className={`px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
              formData.state && (validationStatus.state ? 'border-green-500' : 'border-red-500')
            } ${!formData.state && 'border-gray-300 focus:border-orange-500'}`}
          />
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="ZIP Code"
            required
            maxLength={6}
            className={`px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
              formData.zipCode && (validationStatus.zipCode ? 'border-green-500' : 'border-red-500')
            } ${!formData.zipCode && 'border-gray-300 focus:border-orange-500'}`}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || isValidating}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
            isFormValid && !isValidating
              ? "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-xl hover:scale-[1.02]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isValidating ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Validating Address...
            </>
          ) : (
            <>
              <FaCheckCircle />
              Deliver to this Address
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
