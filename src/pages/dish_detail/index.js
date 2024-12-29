import React, { useState, useEffect } from "react";
import Header from "../../shared/components/header";
import { useNavigate, useParams } from "react-router-dom";
// import { getDishById } from "../../services/restaurantDetail";
// import { DeleteFavoriteAPI, GetFavoriteAPI, PostFavoriteAPI } from "../../services/userApi";
// import { getTokenFromLocalStorage } from "../../services/localtoken";

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => (
                <svg key={`star-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
            {hasHalfStar && <span className="text-yellow-400">½</span>}
        </div>
    );
};

const DishDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Mock data
    const dishData = {
        name: "Tonkotsu Ramen",
        rating: 4.8,
        reviews: 1450,
        image: "/ramen.jpg",
        description: "A rich, umami-filled broth that's made by boiling pork bones for 12 hours. It's usually topped with a slice of chashu, a hand-seasoned boiled egg, menma (bamboo shoots), and negi (green onions).",
        price: 125000,
        ingredients: [
            {
                category: "Noodles",
                items: ["Fresh, chewy ramen noodles"]
            },
            {
                category: "Broth",
                items: ["Slow-cooked pork broth", "Seasoned soy sauce"]
            },
            {
                category: "Toppings",
                items: ["Chashu pork", "Soft-boiled egg", "Green onions", "Bamboo shoots"]
            },
            {
                category: "Optional Toppings",
                items: ["Chopped scallions", "Nori seaweed"]
            }
        ]
    };

    /* Commented API calls
    useEffect(() => {
        const token = getTokenFromLocalStorage();
        if (!token) {
            navigate('/login');
        }
        getDishById(id).then(({ data }) => {
            setDish(data);
        });
    }, [id]);
    */

    return (
        <div 
            className="min-h-screen bg-cover bg-center bg-fixed"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7)), url('/backgr2.jpg')`
            }}
        >
            <Header />
            
            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="bg-orange-100 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
                    {/* Hero Image */}
                    <div className="h-[400px] relative">
                        <img 
                            src={dishData.image}
                            alt={dishData.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content Sections */}
                    <div className="p-8 space-y-8">
                        {/* Header Section - with distinct card */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                {dishData.name}
                            </h1>
                            <div className="flex items-center gap-3 mb-4">
                                <StarRating rating={dishData.rating} />
                                <span className="text-gray-600 font-semibold">
                                    {dishData.rating} ({dishData.reviews.toLocaleString()} đánh giá)
                                </span>
                            </div>
                            <button className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-orange-600 transition-colors duration-300">
                                {dishData.price.toLocaleString()}đ
                            </button>
                        </div>

                        {/* Description Section - with distinct card */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Mô tả
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {dishData.description}
                            </p>
                        </div>

                        {/* Ingredients Section - Redesigned */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                Thành phần
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {dishData.ingredients.map((section, index) => (
                                    <div 
                                        key={index}
                                        className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100 hover:shadow-md transition-all duration-300"
                                    >
                                        <h3 className="font-bold text-lg text-gray-900 mb-4 pb-2 border-b border-orange-200">
                                            {section.category}
                                        </h3>
                                        <ul className="space-y-3">
                                            {section.items.map((item, idx) => (
                                                <li 
                                                    key={idx}
                                                    className="flex items-center gap-3 text-gray-700"
                                                >
                                                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-orange-100 rounded-full">
                                                        <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </span>
                                                    <span className="font-medium">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DishDetail;

