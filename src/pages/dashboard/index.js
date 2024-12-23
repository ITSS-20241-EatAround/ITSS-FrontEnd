import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTokenFromLocalStorage } from '../../services/localtoken';
import Header from '../../shared/components/header';
import { RestaurantSuggest, DishSuggest } from '../../services/suggestApi';

const DashBoard = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerSlide = 3;
    const navigate = useNavigate();

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + itemsPerSlide) % restaurantList.length);
    };

    useEffect(() => {
        const token = getTokenFromLocalStorage();
        // if (!token) {
        //     navigate('/login');
        // }

        RestaurantSuggest({}).then(({ data }) => {
            setRestaurantList(data.data)
        }
        ).catch((err) => {
            console.log(err);
        });

        DishSuggest({}).then(({ data }) => {
            setFoodList(data.data)
        }
        ).catch((err) => {
            console.log(err);
        });


        const interval = setInterval(nextSlide, 10000);
        return () => clearInterval(interval);
    }, []);

    const [restaurantList, setRestaurantList] = useState([
        { name: "Restaurant A" },
        { name: "Restaurant A" },
        { name: "Restaurant A" },
        { name: "Restaurant A" },
        { name: "Restaurant A" },
        { name: "Restaurant A" },
        { name: "Restaurant A" },
        { name: "Restaurant A" },
        { name: "Restaurant A" },
        { name: "Restaurant A" },
        { name: "Restaurant A" },
        { name: "Restaurant A" },
    ]);

    const [foodList, setFoodList] = useState([
        { name: "Dish A"},
        { name: "Dish A"},
        { name: "Dish A"},
        { name: "Dish A"},
        { name: "Dish A"},
        { name: "Dish A"},
        { name: "Dish A"},
        { name: "Dish A"},
        { name: "Dish A"},
        { name: "Dish A"},
        { name: "Dish A"},
    ]);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />

            <div className="p-4 bg-gray-200">
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Nhà hàng hàng đầu hôm nay</h3>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <img src="/res.jpg" alt={restaurantList[0].name} className="w-full h-48 object-cover rounded-md" />
                            <h4 className="text-lg font-semibold mt-2">{restaurantList[0].name}</h4>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Món hàng đầu hôm nay</h3>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <img src="food.jpg" alt={foodList[0].name} className="w-full h-48 object-cover rounded-md" />
                            <h4 className="text-lg font-semibold mt-2">{foodList[0].name}</h4>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-100 min-h-screen">
                    {/* Content */}
                    <div className="p-4">
                        {/* Restaurant Slider */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-4">Nhà hàng gợi ý</h3>
                            <div className="relative">
                                <div className="flex space-x-4 overflow-hidden w-full">
                                    {restaurantList
                                        .slice(currentIndex, currentIndex + itemsPerSlide)
                                        .map((restaurant, index) => (
                                            <div
                                                key={index}
                                                className="bg-white p-4 rounded-lg shadow-md flex-1 transition-transform transform hover:scale-105 hover:shadow-xl"
                                            >
                                                <img
                                                    src="/res.jpg"
                                                    alt={restaurant.name}
                                                    className="w-full h-32 object-cover rounded-md"
                                                />
                                                <h4 className="text-lg font-semibold mt-2">{restaurant.name}</h4>
                                            </div>
                                        ))}
                                </div>
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>

                        {/* Food Slider */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">Món ăn gợi ý</h3>
                            <div className="relative">
                                <div className="flex space-x-4 overflow-hidden w-full">
                                    {foodList.slice(currentIndex, currentIndex + itemsPerSlide).map((food, index) => (
                                        <div
                                            key={index}
                                            className="bg-white p-4 rounded-lg shadow-md flex-1 transition-transform transform hover:scale-105 hover:shadow-xl"
                                        >
                                            <img
                                                src="food.jpg"
                                                alt={food.name}
                                                className="w-full h-32 object-cover rounded-md"
                                            />
                                            <h4 className="text-lg font-semibold mt-2">{food.name}</h4>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
