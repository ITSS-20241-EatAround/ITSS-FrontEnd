import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../shared/components/header';

const FavoritePage = () => {
    const navigate = useNavigate();
    
    // Mock data for favorite dishes
    const favoriteDishes = [
        {
            id: 1,
            name: "Tonkotsu Ramen",
            price: 125000,
            image: "/ramen.jpg",
            rating: 4.8,
            reviews: 1450,
            restaurant: {
                name: "Ramen House",
                image: "/restaurant1.jpg"
            }
        },
        // ... more mock dishes
    ];

    return (
        <div 
            className="min-h-screen bg-cover bg-center bg-fixed"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7)), url('/backgr2.jpg')`
            }}
        >
            <Header />
            
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Your Favorite Dishes
                    </h1>
                    <p className="text-gray-600">
                        Discover and revisit your most loved dishes
                    </p>
                </div>

                {/* Favorites Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favoriteDishes.map((dish) => (
                        <div 
                            key={dish.id}
                            className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            {/* Image Container */}
                            <div className="relative h-48">
                                <img 
                                    src={dish.image}
                                    alt={dish.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                
                                {/* Restaurant Badge */}
                                <div className="absolute top-4 left-4 flex items-center bg-white/90 backdrop-blur-sm rounded-full p-2">
                                    <img 
                                        src={dish.restaurant.image}
                                        alt={dish.restaurant.name}
                                        className="w-6 h-6 rounded-full object-cover"
                                    />
                                    <span className="ml-2 text-sm font-medium text-gray-900">
                                        {dish.restaurant.name}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {dish.name}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg 
                                                        key={i}
                                                        className={`w-4 h-4 ${
                                                            i < Math.floor(dish.rating) 
                                                                ? 'text-yellow-400' 
                                                                : 'text-gray-300'
                                                        }`}
                                                        fill="currentColor" 
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                ({dish.reviews})
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-lg font-bold text-orange-500">
                                        {dish.price.toLocaleString()}đ
                                    </span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between">
                                    <button 
                                        onClick={() => navigate(`/dish-detail/${dish.id}`)}
                                        className="text-orange-500 hover:text-orange-600 font-medium"
                                    >
                                        Xem chi tiết →
                                    </button>
                                    <button 
                                        className="text-red-500 hover:text-red-600"
                                        onClick={() => {/* Remove from favorites */}}
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FavoritePage; 