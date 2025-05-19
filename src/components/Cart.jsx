import React from 'react';

const cartItems = [
  {
    id: 1,
    name: 'Classic White T-Shirt',
    price: 29.99,
    quantity: 2,
    image: 'https://via.placeholder.com/100x100'
  },
  // Add more items as needed
];

function Cart() {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center py-4 border-b">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-blue-600 font-bold">${item.price}</p>
            </div>
            <button className="text-red-500 hover:text-red-700">Remove</button>
          </div>
        ))}
        <div className="mt-6 flex justify-between items-center">
          <span className="text-xl font-bold text-gray-800">Total: ${total.toFixed(2)}</span>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;