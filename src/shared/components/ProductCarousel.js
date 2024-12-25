import React, { useState, useEffect } from 'react';

const ProductCarousel = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = process.env.REACT_APP_API_TOKEN;
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://enmutsubi-kami.myddns.me:7200/api/v1/suggest/dish', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setProducts(data.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [token]);

    if (loading) {
        return <div className="text-center py-6">Loading...</div>;
    }

    // Hiển thị lỗi nếu có
    if (error) {
        return <div className="text-center py-6 text-red-600">Error: {error}</div>;
    }

    // Hiển thị thông tin các sản phẩm
    const ProductCard = ({ product }) => {
        return (
            <div className="flex-shrink-0 w-72 rounded-lg border border-gray-300 shadow-lg bg-white overflow-hidden">
                <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                    <p className="text-lg font-bold text-red-500 mt-2">{product.price} đ</p>
                </div>
            </div>
        );
    };

    return (
        <div className="relative w-full">
            {/* Carousel Container with full width and overflow */}
            <div className="flex justify-center overflow-x-auto py-6 border border-gray-300 rounded-lg bg-gray-100 mx-auto px-4">
                {/* Use flex to align the cards horizontally */}
                <div className="flex space-x-4">
                    {products.map((product) => (
                        <ProductCard key={product.dish_id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductCarousel;
