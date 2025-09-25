import React, { useState } from 'react';
import { PhotoIcon, CurrencyDollarIcon, CubeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const MyProducts = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Small Eggs',
      size: 'Small',
      price: 4.50,
      stock: 120,
      image: null,
      available: true,
    },
    {
      id: 2,
      name: 'Medium Eggs',
      size: 'Medium',
      price: 5.00,
      stock: 85,
      image: null,
      available: true,
    },
    {
      id: 3,
      name: 'Large Eggs',
      size: 'Large',
      price: 5.50,
      stock: 65,
      image: null,
      available: true,
    },
    {
      id: 4,
      name: 'Extra Large Eggs',
      size: 'Extra Large',
      price: 6.00,
      stock: 45,
      image: null,
      available: false,
    },
  ]);

  const handlePriceChange = (id, newPrice) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, price: parseFloat(newPrice) || 0 } : product
    ));
  };

  const handleStockChange = (id, newStock) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, stock: parseInt(newStock) || 0 } : product
    ));
  };

  const handleImageUpload = (id, file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProducts(products.map(product =>
        product.id === id ? { ...product, image: imageUrl } : product
      ));
    }
  };

  const toggleAvailability = (id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, available: !product.available } : product
    ));
  };

  return (
    <div className="flex-1 p-8 bg-green-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">My Products</h1>
        <p className="text-slate-600">Manage your egg inventory, pricing, and product photos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl p-6 shadow-sm border border-green-200">
            {/* Product Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🥚</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                  <p className="text-sm text-slate-500">{product.size}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.available ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {product.available ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>

            {/* Product Image */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Product Photo
              </label>
              <div className="relative">
                <div className="w-full h-32 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <PhotoIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-500">Upload image</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(product.id, e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Inventory */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <CubeIcon className="w-4 h-4 inline mr-1" />
                Stock Level
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={product.stock}
                  onChange={(e) => handleStockChange(product.id, e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  min="0"
                />
                <span className="text-sm text-slate-500">dozen</span>
              </div>
              <div className="mt-2 w-full h-2 bg-slate-200 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((product.stock / 200) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <CurrencyDollarIcon className="w-4 h-4 inline mr-1" />
                Price per Dozen
              </label>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">$</span>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => handlePriceChange(product.id, e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Available for Sale</span>
              <button
                onClick={() => toggleAvailability(product.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  product.available ? 'bg-green-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    product.available ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Card */}
      <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-green-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Inventory Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{products.reduce((sum, p) => sum + p.stock, 0)}</div>
            <div className="text-sm text-slate-500">Total Dozen</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              ${products.filter(p => p.available).reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(2)}
            </div>
            <div className="text-sm text-slate-500">Total Value</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{products.filter(p => p.available).length}</div>
            <div className="text-sm text-slate-500">Active Products</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{products.filter(p => p.image).length}</div>
            <div className="text-sm text-slate-500">With Photos</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;