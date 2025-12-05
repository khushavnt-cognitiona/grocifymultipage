import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from "react-icons/fa";

const NotificationToast = ({ message, type = "success", duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300);
  };

  if (!isVisible) return null;

  const config = {
    success: {
      icon: FaCheckCircle,
      bgColor: "bg-green-50",
      borderColor: "border-green-500",
      iconColor: "text-green-600",
      textColor: "text-green-800"
    },
    error: {
      icon: FaExclamationCircle,
      bgColor: "bg-red-50",
      borderColor: "border-red-500",
      iconColor: "text-red-600",
      textColor: "text-red-800"
    },
    info: {
      icon: FaInfoCircle,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-500",
      iconColor: "text-blue-600",
      textColor: "text-blue-800"
    },
    warning: {
      icon: FaExclamationCircle,
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-500",
      iconColor: "text-yellow-600",
      textColor: "text-yellow-800"
    }
  };

  const { icon: Icon, bgColor, borderColor, iconColor, textColor } = config[type] || config.info;

  return (
    <div
      className={`fixed top-20 right-6 z-[10000] max-w-md transform transition-all duration-300 ${
        isExiting ? "translate-x-[120%] opacity-0" : "translate-x-0 opacity-100"
      }`}
    >
      <div
        className={`${bgColor} ${borderColor} border-l-4 rounded-lg shadow-2xl p-4 flex items-start gap-3`}
      >
        <Icon className={`${iconColor} text-2xl flex-shrink-0 mt-0.5 animate-bounce`} />
        
        <div className="flex-1">
          <p className={`${textColor} font-medium`}>{message}</p>
        </div>

        <button
          onClick={handleClose}
          className={`${iconColor} hover:opacity-70 transition-opacity flex-shrink-0`}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

// Toast Manager Component
export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    // Listen for custom toast events
    const handleShowToast = (event) => {
      const { message, type, duration } = event.detail;
      const id = Date.now();
      
      setToasts((prev) => [...prev, { id, message, type, duration }]);
    };

    window.addEventListener("showToast", handleShowToast);
    return () => window.removeEventListener("showToast", handleShowToast);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className="fixed top-20 right-6 z-[10000] space-y-3">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          style={{ transform: `translateY(${index * 10}px)` }}
          className="transition-transform duration-300"
        >
          <NotificationToast
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
};

// Helper function to show toast
export const showToast = (message, type = "success", duration = 3000) => {
  const event = new CustomEvent("showToast", {
    detail: { message, type, duration }
  });
  window.dispatchEvent(event);
};

export default NotificationToast;
