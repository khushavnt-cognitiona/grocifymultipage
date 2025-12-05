import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBox, FaTruck, FaCheckCircle, FaMapMarkerAlt, FaCreditCard, FaDownload } from "react-icons/fa";

const OrderDetails = () => {
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);

  const handleDownloadInvoice = () => {
    setIsGeneratingInvoice(true);

    // Simulate generation delay
    setTimeout(() => {
      const printWindow = window.open('', '', 'height=800,width=800');
      
      const invoiceHTML = `
        <html>
          <head>
            <title>Invoice #${order.id}</title>
            <style>
              body { font-family: 'Helvetica', sans-serif; padding: 40px; color: #333; }
              .header { display: flex; justify-content: space-between; margin-bottom: 40px; border-bottom: 2px solid #f3f4f6; padding-bottom: 20px; }
              .logo { font-size: 24px; font-weight: bold; color: #ea580c; }
              .invoice-title { font-size: 32px; font-weight: bold; color: #1f2937; text-align: right; }
              .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
              .label { font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
              .value { font-size: 16px; font-weight: 600; color: #111827; }
              table { w-full; width: 100%; border-collapse: collapse; margin-bottom: 40px; }
              th { text-align: left; padding: 12px; border-bottom: 2px solid #e5e7eb; color: #4b5563; font-size: 14px; }
              td { padding: 16px 12px; border-bottom: 1px solid #f3f4f6; }
              .total-section { float: right; width: 300px; }
              .total-row { display: flex; justify-content: space-between; padding: 8px 0; }
              .final-total { font-size: 20px; font-weight: bold; border-top: 2px solid #111827; padding-top: 12px; margin-top: 8px; }
              .footer { margin-top: 80px; text-align: center; font-size: 12px; color: #9ca3af; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">🛒 Grocify</div>
              <div>
                <div class="invoice-title">INVOICE</div>
                <div style="text-align: right; color: #6b7280;">#${order.id}</div>
              </div>
            </div>

            <div class="info-grid">
              <div>
                <div class="label">Billed To</div>
                <div class="value">${order.shippingAddress.name}</div>
                <div>${order.shippingAddress.street}</div>
                <div>${order.shippingAddress.city}</div>
                <div>${order.shippingAddress.phone}</div>
              </div>
              <div style="text-align: right;">
                <div class="label">Date Issued</div>
                <div class="value">${order.date}</div>
                <div class="label" style="margin-top: 12px;">Payment Method</div>
                <div class="value">${order.paymentMethod}</div>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Item Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th style="text-align: right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price}</td>
                    <td style="text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div class="total-section">
              <div class="total-row">
                <span>Subtotal</span>
                <span>$${order.total}</span>
              </div>
              <div class="total-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div class="total-row">
                <span>Tax (5%)</span>
                <span>$${(order.total * 0.05).toFixed(2)}</span>
              </div>
              <div class="total-row final-total">
                <span>Total</span>
                <span>$${(order.total * 1.05).toFixed(2)}</span>
              </div>
            </div>

            <div style="clear: both;"></div>

            <div class="footer">
              <p>Thank you for shopping with Grocify!</p>
              <p>For any questions, contact support@grocify.com</p>
            </div>
          </body>
        </html>
      `;

      printWindow.document.write(invoiceHTML);
      printWindow.document.close();
      printWindow.focus();
      
      // Auto print after loading
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
        setIsGeneratingInvoice(false);
      }, 500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate('/myorders')}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
          >
            <FaArrowLeft /> Back to Orders
          </button>
          <button 
            onClick={handleDownloadInvoice}
            disabled={isGeneratingInvoice}
            className={`flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold ${
              isGeneratingInvoice ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isGeneratingInvoice ? (
              <>
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
                <FaDownload /> Invoice
              </>
            )}
          </button>
        </div>

        {/* Order Status Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
              <p className="text-gray-500">Placed on {order.date}</p>
            </div>
            <span className="mt-2 md:mt-0 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold flex items-center gap-2">
              <FaCheckCircle /> {order.status}
            </span>
          </div>

          {/* Timeline */}
          <div className="relative flex justify-between mt-8 mb-4">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
            {order.timeline.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 ${
                  step.completed ? 'bg-green-500 border-green-200 text-white' : 'bg-white border-gray-200 text-gray-300'
                }`}>
                  {step.completed ? <FaCheckCircle /> : <div className="w-3 h-3 bg-gray-300 rounded-full"></div>}
                </div>
                <p className="text-xs font-semibold mt-2 text-center hidden md:block">{step.status}</p>
                <p className="text-[10px] text-gray-500 text-center hidden md:block">{step.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Items List */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaBox className="text-orange-500" /> Items
              </h2>
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="text-4xl">{item.image}</div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-gray-900">${item.price}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="font-bold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-orange-600">${order.total}</span>
              </div>
            </div>
          </div>

          {/* Shipping & Payment Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500" /> Shipping
              </h2>
              <p className="font-bold text-gray-900">{order.shippingAddress.name}</p>
              <p className="text-gray-600">{order.shippingAddress.street}</p>
              <p className="text-gray-600">{order.shippingAddress.city}</p>
              <p className="text-gray-600 mt-2">{order.shippingAddress.phone}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaCreditCard className="text-purple-500" /> Payment
              </h2>
              <p className="text-gray-600">{order.paymentMethod}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
