import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { getTokenFromLocalStorage } from '../../services/localtoken';
import Header from '../../shared/components/header';

const DashBoard = () => {
    const navigate = useNavigate();
    
    // Mock data (thay thế API call)
    const featuredDish = {
        name: "Today's Featured Dish",
        description: "Authentic Japanese ramen with special noodles and fresh ingredients, served in a savory broth",
        image: "/ramen.jpg"
    };

    const recommendedDishes = [
        {
            name: "Spicy Chicken Sandwich",
            price: "$8.99",
            deliveryTime: "20-30 minutes",
            image: "garan.jpg"
        },
        {
            name: "Vegan Burrito Bowl",
            price: "$12.99",
            deliveryTime: "15-25 minutes",
            image: "comrang.jpg"
        },
        {
            name: "Fresh Ahi Poke Bowl",
            price: "$14.99",
            deliveryTime: "15-20 minutes",
            image: "bunrieu.jpg"
        }
    ];

    return (
        <div 
            className="min-h-screen bg-cover bg-center bg-fixed"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.5)), url('/backgr2.jpg')`
            }}
        >
            <Header />
            
            {/* Featured Dish Section */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="relative rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
                    <img 
                        src={featuredDish.image} 
                        alt="Featured Dish" 
                        className="w-full h-[500px] object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                        <h2 className="text-white text-4xl font-bold mb-3">{featuredDish.name}</h2>
                        <p className="text-white text-lg mb-4">{featuredDish.description}</p>
                        <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors duration-300">
                            Order now
                        </button>
                    </div>
                </div>

                {/* More to Explore Section - Updated */}
                <div className="mt-16">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-4xl font-bold text-black-800 relative">
                            More to Explore
                        </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {recommendedDishes.map((dish, index) => (
                            <div 
                                key={index}
                                className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/90 backdrop-blur-sm"
                            >
                                <div className="relative">
                                    <img 
                                        src={dish.image} 
                                        alt={dish.name} 
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                        <span className="text-orange-500 font-semibold">{dish.price}</span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h4 className="font-bold text-xl mb-3 text-gray-800">{dish.name}</h4>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">{dish.deliveryTime}</span>
                                        <button className="text-orange-500 hover:text-orange-600 font-medium">
                                            Order now →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View More Button */}
                    <div className="text-center mt-12">
                        <button className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-300 ease-in-out bg-orange-500 rounded-full hover:bg-orange-600 focus:outline-none shadow-lg hover:shadow-xl">
                            <span className="mr-2">Xem thêm món ăn</span>
                            <svg 
                                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
