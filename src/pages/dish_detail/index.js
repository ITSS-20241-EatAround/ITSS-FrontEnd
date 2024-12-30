import React, { useState, useEffect } from "react";
import Header from "../../shared/components/header";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../../shared/components/comment"
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
    const [isFavorite, setIsFavorite] = useState(false);

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

    // Thêm mock data cho restaurant
    const restaurantData = {
        id: 1,
        name: "The Good Eggs Cafe",
        rating: 4.5,
        reviews: 1200,
        image: "/restaurant1.jpg",
        address: "123 Food Street, District 1, Ho Chi Minh City",
        distance: 1.5,
        priceRange: {
            min: 15000,
            max: 100000
        }
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
                            <div className="flex justify-between items-start">
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                    {dishData.name}
                                </h1>
                                
                                {/* Favorite Button */}
                                <button 
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className={`group relative p-3 rounded-xl transition-all duration-300 ${
                                        isFavorite ? 'bg-red-50' : 'hover:bg-gray-100'
                                    }`}
                                >
                                    <div className="relative">
                                        {/* Background Heart */}
                                        <svg 
                                            className={`w-8 h-8 transition-all duration-300 ${
                                                isFavorite ? 'text-red-500' : 'text-gray-300'
                                            }`}
                                            fill="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                        
                                        {/* Animated Particles */}
                                        {isFavorite && (
                                            <>
                                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                                                <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-500 rounded-full animate-ping delay-100" />
                                                <span className="absolute -top-1 -left-1 w-2 h-2 bg-red-500 rounded-full animate-ping delay-200" />
                                            </>
                                        )}
                                    </div>
                                </button>
                            </div>
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

                        {/* Restaurant Information Card */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                Nhà hàng
                            </h2>
                            
                            <div className="bg-orange-50 rounded-xl p-6">
                                <div className="flex items-start gap-6">
                                    {/* Restaurant Image */}
                                    <div className="w-24 h-24 flex-shrink-0">
                                        <img 
                                            src={restaurantData.image}
                                            alt={restaurantData.name}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>

                                    {/* Restaurant Details */}
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                    {restaurantData.name}
                                                </h3>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <StarRating rating={restaurantData.rating} />
                                                    <span className="text-gray-600 text-sm">
                                                        {restaurantData.rating} ({restaurantData.reviews.toLocaleString()} đánh giá)
                                                    </span>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => navigate(`/restaurant-detail/${restaurantData.id}`)}
                                                className="text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1"
                                            >
                                                Xem nhà hàng
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mt-3">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="text-sm text-gray-600">{restaurantData.address}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-sm text-gray-600">
                                                    {restaurantData.priceRange.min.toLocaleString()}đ - {restaurantData.priceRange.max.toLocaleString()}đ
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                        <Comment id={1}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DishDetail;

