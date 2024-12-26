import React, { useState, useEffect } from 'react';
import { DishSuggest } from '../../services/suggestApi';
import { getTokenFromLocalStorage } from '../../services/localtoken';
import { useNavigate } from 'react-router-dom';
const RestaurantCarousel = ({ products }) => {
    const navigate = useNavigate();
    const token = getTokenFromLocalStorage();
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerSlide = 5;
    const nextSlide = () => {
        if (currentIndex + itemsPerSlide < products.length) {
            setCurrentIndex(currentIndex + itemsPerSlide);
        }
    };
    const prevSlide = () => {
        if (currentIndex - itemsPerSlide >= 0) {
            setCurrentIndex(currentIndex - itemsPerSlide);
        }
    };
    const handleClick = (foodId) => {
        navigate(`/restaurant-detail/${foodId}`);
    };
    useEffect(() => {
        const interval = setInterval(nextSlide, 10000);
        return () => clearInterval(interval);
    }, [token]);

    return (
        <div className="mt-5 mb-4">
            <h3 className="text-2xl font-bold mb-4 ml-4">Nhà hàng gợi ý</h3>
            <div className="relative">
                <div className="flex space-x-4 overflow-hidden w-full">
                    {products.slice(currentIndex, currentIndex + itemsPerSlide).map((product, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-lg shadow-md flex-1 transition-transform transform hover:scale-105 hover:shadow-xl"
                            onClick={() => handleClick(product.restaurant_id)}
                        >
                            <img
                                src={product.image_url || "https://posapp.vn/wp-content/uploads/2020/09/%C4%91%E1%BB%93ng-b%E1%BB%99-n%E1%BB%99i-th%E1%BA%A5t.jpg"}
                                alt={product.name || "Restaurant image"}
                                className="w-full h-32 object-cover rounded-md"
                            />
                            <p className="text-lg font-semibold">
                                Tên nhà hàng: <span className="font-normal">{product.name}</span>
                            </p>
                            <p className="text-lg font-semibold">
                                Địa chỉ: <span className="font-normal">{product.address}</span>
                            </p>
                            <p className="text-lg font-semibold"> Đánh giá : {product.rating} <span className="text-yellow-500 text-lg">
                                ★
                            </span></p>
                            <p className="text-lg font-semibold">
                                Liên hệ: <span className="font-normal">{product.contact || "Không có thông tin liên hệ"}</span>
                            </p>
                            <p className="text-lg font-semibold">
                                Khoảng cách: <span className="font-normal">{+product.distance < 1 ? (+product.distance * 1000).toFixed(0) + "m" : (+product.distance).toFixed(0) + "km"}</span>
                            </p>
                            <p className="text-lg font-semibold">
                                Giá: <span className="font-normal">{(+product.dishPrices.lowest).toFixed(0) + " - " + (+product.dishPrices.highest).toFixed(0)}</span>
                            </p>
                        </div>
                    ))}
                </div>
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                >
                    &lt;
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}

export default RestaurantCarousel;
