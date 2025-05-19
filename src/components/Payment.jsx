import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const TEST_CART_DATA = {
  items: [
    { id: 1, name: 'Blue Denim Jacket', price: 89.99, quantity: 1 },
    { id: 2, name: 'White T-Shirt', price: 29.99, quantity: 2 },
    { id: 3, name: 'Black Jeans', price: 59.99, quantity: 1 }
  ],
  subtotal: 209.96,
  tax: 16.80,
  shipping: 5.00
};

function Payment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '4111 1111 1111 1111',
    expiryDate: '12/24',
    cvv: '123',
    name: 'Test User'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      toast.success('Payment successful! Order confirmed.');
      navigate('/invoice', { 
        state: { 
          orderDetails: TEST_CART_DATA,
          paymentMethod: 'Credit Card',
          orderId: 'ORD-' + Math.random().toString(36).substr(2, 9)
        } 
      });
    }, 2000);
  };

  const handleInputChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Order Summary</h2>
          <div className="space-y-4">
            {TEST_CART_DATA.items.map(item => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${TEST_CART_DATA.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${TEST_CART_DATA.tax}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${TEST_CART_DATA.shipping}</span>
              </div>
              <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                <span>Total</span>
                <span>${(TEST_CART_DATA.subtotal + TEST_CART_DATA.tax + TEST_CART_DATA.shipping).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Payment Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentData.expiryDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={paymentData.cvv}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123"
                  required