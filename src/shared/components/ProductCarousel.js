import React, { useState } from 'react';
import './ProductCarousel.css'; // Đảm bảo bạn đã tạo file CSS cho Carousel

const ProductCarousel = ({ products }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Hàm chuyển sang sản phẩm tiếp theo
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    };

    // Hàm chuyển sang sản phẩm trước đó
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    };

    return (
        <div className="carousel-container">
            {/* Nút chuyển trái */}
            <button className="prev-btn" onClick={handlePrev}>❮</button>

            {/* Hiển thị sản phẩm */}
            <div className="carousel">
                <div className="carousel-item">
                    <img src={products[currentIndex].imgSrc} alt={products[currentIndex].name} />
                    <h3>{products[currentIndex].name}</h3>
                    <p>{products[currentIndex].price}</p>
                    <button>Add to cart</button>
                </div>
            </div>

            {/* Nút chuyển phải */}
            <button className="next-btn" onClick={handleNext}>❯</button>
        </div>
    );
};

export default ProductCarousel;
