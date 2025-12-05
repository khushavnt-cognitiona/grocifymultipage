import React, { useState, useEffect } from "react";
import { FaCreditCard, FaUniversity, FaWallet, FaCheckCircle, FaLock, FaShieldAlt, FaMoneyBillWave, FaPercentage } from "react-icons/fa";
import { SiVisa, SiMastercard, SiPaypal } from "react-icons/si";

const PaymentMethod = ({ onPaymentComplete, totalAmount }) => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedEMI, setSelectedEMI] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState("");
  const [validationStatus, setValidationStatus] = useState({});

  const paymentMethods = [
    {
      id: 'card',
      name: 'Card',
      icon: FaCreditCard,
      color: 'from-blue-500 to-cyan-600',
      description: 'Credit/Debit'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: FaWallet,
      color: 'from-green-500 to-emerald-600',
      description: 'Instant'
    },
    {
      id: 'cod',
      name: 'COD',
      icon: FaMoneyBillWave,
      color: 'from-orange-500 to-red-600',
      description: 'Cash'
    },
    {
      id: 'netbanking',
      name: 'Banking',
      icon: FaUniversity,
      color: 'from-purple-500 to-pink-600',
      description: 'Net'
    },
    {
      id: 'emi',
      name: 'EMI',
      icon: FaPercentage,
      color: 'from-indigo-500 to-blue-600',
      description: 'Installments'
    }
  ];

  const emiPlans = [
    { months: 3, interest: 0, emiAmount: (totalAmount / 3).toFixed(2) },
    { months: 6, interest: 0, emiAmount: (totalAmount / 6).toFixed(2) },
    { months: 9, interest: 12, emiAmount: ((totalAmount * 1.12) / 9).toFixed(2) },
    { months: 12, interest: 15, emiAmount: ((totalAmount * 1.15) / 12).toFixed(2) }
  ];

  const banks = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Punjab National Bank",
    "Bank of Baroda"
  ];

  // Real-time card validation
  useEffect(() => {
    const newStatus = {};
    
    if (cardData.cardNumber) {
      const cleaned = cardData.cardNumber.replace(/\s/g, '');
      newStatus.cardNumber = cleaned.length === 16 && /^\d+$/.test(cleaned);
    }
    
    if (cardData.cardName) {
      newStatus.cardName = cardData.cardName.length >= 3;
    }
    
    if (cardData.expiryDate) {
      const [month, year] = cardData.expiryDate.split('/');
      const isValid = month && year && parseInt(month) <= 12 && parseInt(month) > 0;
      newStatus.expiryDate = isValid && cardData.expiryDate.length === 5;
    }
    
    if (cardData.cvv) {
      newStatus.cvv = cardData.cvv.length === 3 && /^\d+$/.test(cardData.cvv);
    }
    
    setValidationStatus(newStatus);
  }, [cardData]);

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardChange = (e) => {
    let value = e.target.value;
    
    if (e.target.name === 'cardNumber') {
      value = formatCardNumber(value.replace(/\s/g, '').slice(0, 16));
    } else if (e.target.name === 'expiryDate') {
      value = formatExpiryDate(value);
    } else if (e.target.name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 3);
    }
    
    setCardData({
      ...cardData,
      [e.target.name]: value
    });
  };

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Different processing for different methods
    let stages = [];
    
    if (selectedMethod === 'card') {
      stages = [
        { message: "Validating card details...", delay: 1000 },
        { message: "Contacting payment gateway...", delay: 1500 },
        { message: "Verifying with bank...", delay: 2000 },
        { message: "Authorizing payment...", delay: 1500 },
        { message: "Payment successful!", delay: 1000 }
      ];
    } else if (selectedMethod === 'upi') {
      stages = [
        { message: "Verifying UPI ID...", delay: 800 },
        { message: "Sending payment request...", delay: 1200 },
        { message: "Waiting for approval...", delay: 2000 },
        { message: "Payment successful!", delay: 800 }
      ];
    } else if (selectedMethod === 'cod') {
      stages = [
        { message: "Confirming delivery address...", delay: 1000 },
        { message: "Preparing cash receipt...", delay: 1000 },
        { message: "Order confirmed for COD!", delay: 1000 }
      ];
    } else if (selectedMethod === 'netbanking') {
      stages = [
        { message: "Connecting to bank...", delay: 1500 },
        { message: "Redirecting to secure page...", delay: 1000 },
        { message: "Verifying credentials...", delay: 2000 },
        { message: "Payment successful!", delay: 1000 }
      ];
    } else if (selectedMethod === 'emi') {
      stages = [
        { message: "Checking EMI eligibility...", delay: 1200 },
        { message: "Processing EMI request...", delay: 1500 },
        { message: "Setting up installments...", delay: 1800 },
        { message: "EMI plan activated!", delay: 1000 }
      ];
    }

    let currentStage = 0;
    const processStage = () => {
      if (currentStage < stages.length) {
        setProcessingStage(stages[currentStage].message);
        setTimeout(() => {
          currentStage++;
          processStage();
        }, stages[currentStage].delay);
      } else {
        setIsProcessing(false);
        onPaymentComplete && onPaymentComplete({
          method: selectedMethod,
          amount: selectedMethod === 'emi' ? parseFloat(selectedEMI?.emiAmount || totalAmount) : totalAmount,
          totalAmount: totalAmount,
          emiMonths: selectedEMI?.months,
          transactionId: `TXN${Date.now()}`,
          status: 'success'
        });
      }
    };

    processStage();
  };

  const isFormValid = () => {
    switch (selectedMethod) {
      case 'card':
        return Object.keys(validationStatus).length === 4 && Object.values(validationStatus).every(v => v);
      case 'upi':
        return upiId.includes('@') && upiId.length >= 5;
      case 'cod':
        return true; // COD always valid
      case 'netbanking':
        return selectedBank !== "";
      case 'emi':
        return selectedEMI !== null;
      default:
        return false;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl">
          <FaLock className="text-white text-2xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
          <p className="text-sm text-gray-600">Choose your preferred payment option</p>
        </div>
      </div>

      {/* Total Amount Display */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Amount to Pay:</span>
          <span className="text-3xl font-bold text-gray-900">${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            className={`p-3 rounded-xl border-2 transition-all ${
              selectedMethod === method.id
                ? `border-orange-500 bg-gradient-to-br ${method.color} text-white shadow-lg scale-105`
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <method.icon className={`text-2xl mx-auto mb-1 ${
              selectedMethod === method.id ? "text-white" : "text-gray-600"
            }`} />
            <p className={`font-semibold text-xs ${
              selectedMethod === method.id ? "text-white" : "text-gray-900"
            }`}>
              {method.name}
            </p>
            <p className={`text-[10px] ${
              selectedMethod === method.id ? "text-white/90" : "text-gray-500"
            }`}>
              {method.description}
            </p>
          </button>
        ))}
      </div>

      {/* Card Payment Form */}
      {selectedMethod === 'card' && (
        <div className="space-y-4 mb-6">
          {/* Card Number */}
          <div className="relative">
            <FaCreditCard className="absolute left-4 top-4 text-gray-400" />
            <input
              type="text"
              name="cardNumber"
              value={cardData.cardNumber}
              onChange={handleCardChange}
              placeholder="Card Number"
              className={`w-full pl-12 pr-24 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                cardData.cardNumber && (validationStatus.cardNumber ? 'border-green-500' : 'border-red-500')
              } ${!cardData.cardNumber && 'border-gray-300 focus:border-orange-500'}`}
            />
            <div className="absolute right-4 top-3 flex gap-2">
              <SiVisa className="text-2xl text-blue-600" />
              <SiMastercard className="text-2xl text-red-600" />
            </div>
          </div>

          {/* Card Name */}
          <div className="relative">
            <input
              type="text"
              name="cardName"
              value={cardData.cardName}
              onChange={handleCardChange}
              placeholder="Cardholder Name"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                cardData.cardName && (validationStatus.cardName ? 'border-green-500' : 'border-red-500')
              } ${!cardData.cardName && 'border-gray-300 focus:border-orange-500'}`}
            />
            {cardData.cardName && validationStatus.cardName && (
              <FaCheckCircle className="absolute right-4 top-4 text-green-500" />
            )}
          </div>

          {/* Expiry & CVV */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="expiryDate"
              value={cardData.expiryDate}
              onChange={handleCardChange}
              placeholder="MM/YY"
              maxLength={5}
              className={`px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                cardData.expiryDate && (validationStatus.expiryDate ? 'border-green-500' : 'border-red-500')
              } ${!cardData.expiryDate && 'border-gray-300 focus:border-orange-500'}`}
            />
            <input
              type="password"
              name="cvv"
              value={cardData.cvv}
              onChange={handleCardChange}
              placeholder="CVV"
              maxLength={3}
              className={`px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                cardData.cvv && (validationStatus.cvv ? 'border-green-500' : 'border-red-500')
              } ${!cardData.cvv && 'border-gray-300 focus:border-orange-500'}`}
            />
          </div>
        </div>
      )}

      {/* UPI Payment */}
      {selectedMethod === 'upi' && (
        <div className="mb-6">
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="Enter UPI ID (example@upi)"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-2">Popular UPI apps: GPay, PhonePe, Paytm, BHIM</p>
        </div>
      )}

      {/* COD */}
      {selectedMethod === 'cod' && (
        <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-xl p-6">
          <div className="text-center mb-4">
            <FaMoneyBillWave className="text-6xl text-green-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Cash on Delivery</h3>
            <p className="text-gray-700">Pay when your order arrives at your doorstep</p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-600" />
              <span>Pay in cash to our delivery person</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-600" />
              <span>Exact change recommended</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-600" />
              <span>No additional charges</span>
            </div>
          </div>
        </div>
      )}

      {/* Net Banking */}
      {selectedMethod === 'netbanking' && (
        <div className="mb-6">
          <select 
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none"
          >
            <option value="">Select Your Bank</option>
            {banks.map((bank, index) => (
              <option key={index} value={bank}>{bank}</option>
            ))}
          </select>
        </div>
      )}

      {/* EMI Plans */}
      {selectedMethod === 'emi' && (
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-4">Choose your EMI plan (No Cost EMI available):</p>
          <div className="grid grid-cols-2 gap-3">
            {emiPlans.map((plan, index) => (
              <button
                key={index}
                onClick={() => setSelectedEMI(plan)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedEMI?.months === plan.months
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-900">{plan.months} Months</span>
                  {plan.interest === 0 && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      No Cost
                    </span>
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-900">${plan.emiAmount}</p>
                <p className="text-sm text-gray-600">per month</p>
                {plan.interest > 0 && (
                  <p className="text-xs text-orange-600 mt-1">{plan.interest}% interest</p>
                )}
              </button>
            ))}
          </div>
          {selectedEMI && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-900">
                <strong>Total Amount:</strong> ${(selectedEMI.emiAmount * selectedEMI.months).toFixed(2)} ({selectedEMI.months} × ${selectedEMI.emiAmount})
              </p>
            </div>
          )}
        </div>
      )}

      {/* Processing Stage */}
      {isProcessing && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <div>
              <p className="font-bold text-blue-900">{processingStage}</p>
              <p className="text-sm text-blue-700">Please wait, do not close this window</p>
            </div>
          </div>
        </div>
      )}

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        disabled={!isFormValid() || isProcessing}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
          isFormValid() && !isProcessing
            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-xl hover:scale-[1.02]"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {isProcessing ? (
          <>Processing...</>
        ) : (
          <>
            <FaShieldAlt />
            {selectedMethod === 'cod' ? 'Place Order (COD)' : selectedMethod === 'emi' ? 'Start EMI Plan' : `Pay $${totalAmount.toFixed(2)} Securely`}
          </>
        )}
      </button>

      {/* Security Badges */}
      <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <FaLock className="text-green-600" />
          256-bit SSL Encrypted
        </span>
        <span className="flex items-center gap-1">
          <FaShieldAlt className="text-blue-600" />
          100% Secure
        </span>
      </div>
    </div>
  );
};

export default PaymentMethod;
