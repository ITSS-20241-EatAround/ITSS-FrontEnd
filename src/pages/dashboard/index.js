import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../shared/components/header';
import { DishSuggest } from '../../services/suggestApi';
const DashBoard = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [dish, setDish] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            console.log('call')
            const data = await DishSuggest();
            setDish(data.data.data || []);
            console.log(dish)
        }
        fetchData();
    }, [])

    const slidesCount = dish?.length ? Math.ceil(dish.length / 3) : 1;
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slidesCount);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);
    };

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
                        src={dish[0]?.image_url} 
                        alt="Featured Dish" 
                        className="w-full h-[500px] object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                        <h2 className="text-white text-5xl font-bold mb-3">
                            Today Suggested Dish
                        </h2>

                        <p className="text-white text-lg mb-6">
                            {dish[0]?.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                            <h3 className="text-4xl font-bold text-orange-500">
                                {dish[0]?.name}
                            </h3>
                            <button 
                                onClick={() => navigate(`/dish-detail/${dish[0]?.dish_id}`)}
                                className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors duration-300"
                            >
                                Xem chi tiết
                            </button>
                        </div>
                    </div>
                </div>

                {/* More to Explore Section - Updated with Carousel */}
                <div className="mt-16 mb-16">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-4xl font-bold text-gray-800">
                            More to Explore
                        </h3>
                    </div>
                    
                    <div className="relative">
                        {/* Carousel Navigation Buttons */}
                        <button 
                            onClick={prevSlide}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition-all duration-300 z-10"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        
                        <div className="overflow-hidden">
                            <div 
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }} 
                            >
                                {/* Wrap all slides in a container */}
                                {[...Array(Math.ceil(dish.length / 3))].map((_, index) => (
                                    <div key={index} className="grid grid-cols-3 gap-8 w-full flex-shrink-0">
                                        {dish
                                            .slice(index * 3, (index * 3) + 3)
                                            .map((dish) => (
                                                <div 
                                                    key={dish.dish_id}
                                                    className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/90 backdrop-blur-sm"
                                                >
                                                    <div className="relative">
                                                        <img 
                                                            src={dish.image_url} 
                                                            alt={dish.name} 
                                                            className="w-full h-48 object-cover"
                                                        />
                                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                                            <span className="text-orange-500 font-semibold">{dish.price}đ</span>
                                                        </div>
                                                    </div>
                                                    <div className="p-5">
                                                        <h4 className="font-bold text-xl mb-3 text-gray-800">{dish.name}</h4>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-sm text-gray-600">{dish.description}</span>
                                                            <button 
                                                                onClick={() => navigate(`/dish-detail/${dish.dish_id}`)}
                                                                className="text-orange-500 hover:text-orange-600 font-medium"
                                                            >
                                                                Xem chi tiết →
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button 
                            onClick={nextSlide}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition-all duration-300 z-10"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Dot Navigation */}
                        <div className="flex justify-center gap-3 mt-8">
                            {[...Array(slidesCount)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        currentSlide === index 
                                            ? 'bg-orange-500 w-8' 
                                            : 'bg-gray-300 hover:bg-orange-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Message */}
                <div className="text-center py-16">
                    <div className="relative inline-block">
                        {/* Decorative elements */}
                        <div className="absolute -left-12 -top-8 w-24 h-24 bg-orange-100 rounded-full blur-xl opacity-60"></div>
                        <div className="absolute -right-12 -bottom-8 w-24 h-24 bg-orange-200 rounded-full blur-xl opacity-60"></div>
                        
                        {/* Main message container */}
                        <div className="relative bg-white/90 backdrop-blur-md rounded-2xl px-12 py-6 shadow-xl border border-orange-100">
                            {/* Top decorative line */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
                            </div>
                            
                            {/* Message content */}
                            <div className="space-y-2">
                                <p className="text-3xl bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
                                    ✨ Chúc bạn thưởng thức ✨
                                </p>
                                <p className="text-3xl bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                                    ngon miệng
                                </p>
                            </div>

                            {/* Bottom decorative line */}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
                            </div>
                        </div>

                        {/* Decorative icons */}
                        <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
                            <svg className="w-8 h-8 text-orange-400 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                        <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
                            <svg className="w-8 h-8 text-orange-400 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
