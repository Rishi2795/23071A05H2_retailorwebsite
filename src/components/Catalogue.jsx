import React from 'react';

const products = [
  {
    id: 1,
    name: 'Classic White T-Shirt',
    price: 29.99,
    image: 'https://via.placeholder.com/200x300',
    category: 'T-Shirts'
  },
  {
    id: 2,
    name: 'Blue Denim Jeans',
    price: 59.99,
    image: 'https://via.placeholder.com/200x300',
    category: 'Jeans'
  },
  {
    id: 3,
    name: 'Navy Blazer',
    price: 129.99,
    image: 'https://via.placeholder.com/200x300',
    category: 'Jackets'
  },
  // Add more products as needed
];

function Catalogue() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Our Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-bold">${product.price}</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogue;