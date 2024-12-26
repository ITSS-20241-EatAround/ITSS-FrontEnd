import React, { useState, useEffect } from 'react';
import { DishSuggest } from '../../services/suggestApi';
import { getTokenFromLocalStorage } from '../../services/localtoken';
import { useNavigate } from 'react-router-dom';
const ProductCarousel = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
        navigate(`/dish-detail/${foodId}`);
    };
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await DishSuggest();

                console.log(response)
                if (Array.isArray(response.data.data)) {
                    setProducts(response.data.data);
                } else {
                    throw new Error('Dữ liệu không hợp lệ');
                }
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchProducts();
        const interval = setInterval(nextSlide, 10000);
        return () => clearInterval(interval);
    }, [token]);

    if (loading) {
        return <div className="text-center py-6">Loading...</div>;
    }
    if (error) {
        return <div className="text-center py-6 text-red-600">Error: {error}</div>;
    }



    return (
        <>
            <div className="container mx-auto my-10">
                <h2 className="text-4xl font-bold uppercase mb-5 text-primary">Món ăn hàng đầu</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10" onClick={() => handleClick(products[0].dish_id)}>
                    {/* Image Section */}
                    <div className="relative flex items-start lg:items-center">
                        <img
                            src={products[0].image_url || "food.jpg"}
                            alt="dish image"
                            className="w-full lg:w-3/4 object-cover object-center rounded-lg"
                        />
                    </div>

                    {/* Text Section */}
                    <div className="flex flex-col justify-start lg:justify-center text-center lg:text-left">
                        <div className="space-y-2">
                            <p className="text-lg font-semibold">
                                Tên món: <span className="font-normal">{products[0].name}</span>
                            </p>
                            <p className="text-lg font-semibold">
                                Mô tả: <span className="font-normal">{products[0].description}</span>
                            </p>
                            <p className="text-lg font-semibold">
                                Giá: <span className="font-normal">{Number(products[0].price)} đ</span>
                            </p>
                            <p className="text-lg font-semibold">
                                Nhà hàng: <span className="font-normal">{products[0].restaurant.name}</span>
                            </p>
                            <p className="text-lg font-semibold">
                                Địa chỉ: <span className="font-normal">{products[0].restaurant.address}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 mb-4">
                <h3 className="text-2xl font-bold mb-4 ml-4">Món ăn gợi ý</h3>
                <div className="relative">
                    <div className="flex space-x-4 overflow-hidden w-full">
                        {products.slice(currentIndex, currentIndex + itemsPerSlide).map((food, index) => (
                            <div
                                key={index}
                                className="bg-white p-4 rounded-lg shadow-md flex-1 transition-transform transform hover:scale-105 hover:shadow-xl"
                                onClick={() => handleClick(food.dish_id)}
                            >
                                <img
                                    src={food.image_url || "food.jpg"}
                                    alt={food.name}
                                    className="w-full h-32 object-cover rounded-md"
                                />
                                <h4 className="text-lg font-semibold mt-2">{food.name}</h4>
                                <h4 className="text-lg font-semibold mt-2">{Number(food.price)} đ</h4>
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
        </>
    );
}

export default ProductCarousel;
