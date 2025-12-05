import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGift, FaCoins, FaHistory, FaArrowLeft, FaHome, FaTrophy } from "react-icons/fa";

const RewardsPage = () => {
  const navigate = useNavigate();

  const rewards = {
    points: 450,
    tier: "Silver",
    nextTier: "Gold",
    pointsToNextTier: 550,
    history: [
      { id: 1, action: "Purchase - Order #12345", points: "+50", date: "Dec 3, 2024", type: "credit" },
      { id: 2, action: "Review - Organic Bananas", points: "+10", date: "Dec 4, 2024", type: "credit" },
      { id: 3, action: "Redeemed - Coupon", points: "-100", date: "Nov 28, 2024", type: "debit" },
      { id: 4, action: "Purchase - Order #12300", points: "+120", date: "Nov 20, 2024", type: "credit" }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-6 py-6">
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
                  <FaGift /> My Rewards
                </h1>
                <p className="text-sm opacity-90">Earn points and save more!</p>
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
        
        {/* Points Card */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg opacity-90 mb-1">Available Balance</p>
              <h2 className="text-6xl font-bold mb-4 flex items-center gap-3">
                <FaCoins className="text-yellow-300" /> {rewards.points}
              </h2>
              <p className="text-sm bg-white/20 inline-block px-3 py-1 rounded-full">
                100 Points = $1.00
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg flex items-center gap-2">
                  <FaTrophy className="text-yellow-300" /> {rewards.tier} Member
                </span>
                <span className="text-sm opacity-80">{rewards.pointsToNextTier} points to {rewards.nextTier}</span>
              </div>
              <div className="w-full bg-black/20 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-yellow-300 to-yellow-500 h-3 rounded-full" 
                  style={{ width: '45%' }}
                ></div>
              </div>
              <p className="text-xs opacity-75">Unlock free shipping and exclusive deals at Gold tier!</p>
            </div>
          </div>
        </div>

        {/* Rewards Grid */}
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Redeem Points</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { title: "$5 Off Coupon", cost: 500, color: "from-green-400 to-green-600" },
            { title: "$10 Off Coupon", cost: 1000, color: "from-blue-400 to-blue-600" },
            { title: "Free Shipping", cost: 300, color: "from-orange-400 to-orange-600" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all">
              <div className={`h-24 bg-gradient-to-r ${item.color} flex items-center justify-center`}>
                <FaGift className="text-white text-4xl group-hover:scale-110 transition-transform" />
              </div>
              <div className="p-6 text-center">
                <h4 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h4>
                <p className="text-gray-500 mb-4">{item.cost} Points</p>
                <button 
                  disabled={rewards.points < item.cost}
                  className={`w-full py-2 rounded-xl font-bold transition-all ${
                    rewards.points >= item.cost 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Redeem
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* History */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FaHistory className="text-gray-500" /> Points History
          </h3>
          <div className="space-y-4">
            {rewards.history.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                <div>
                  <p className="font-bold text-gray-900">{item.action}</p>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
                <span className={`font-bold text-lg ${
                  item.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.points}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RewardsPage;
