import React, { useState, useEffect } from 'react';
import { getTokenFromLocalStorage } from '../../services/localtoken';
import Header from '../../shared/components/header';
import { RestaurantSuggest, DishSuggest } from '../../services/suggestApi';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductSuggest from '../../shared/components/ProductSuggest';
import ProductCarousel from '../../shared/components/ProductCarousel';

const DashBoard = () => {
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError] = useState(null);

    const itemsPerSlide = 3;

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
        { name: "Restaurant A" }
    ]);


    const [foodList, setFoodList] = useState([
        { name: "Dish A" },
    ]);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <section className="img-page">
                <div className="row">
                    <div className="col-12 col-md-12 ">
                        <h2 className="hero-subtitle">Welcome To</h2>
                        <h1 className="hero-title">ITSS Restaurant</h1>
                    </div>
                </div>
            </section>
            <ProductSuggest />
            <div className='menu-section py-5 text-light shadow'>
                <div className='container d-flex flex-column align-items-center'>
                    <h2 className='fs-1 mb-5 text-uppercase fw-bold'>Món ăn hàng đầu</h2>
                    <div className='row mb-5 w-100'>
                        <div className='col-lg-6 d-flex flex-column align-items-center mb-5 mb-lg-0'>
                            <h3 className='fs-2 mb-5'>Đồ ăn</h3>
                            <ul className='px-0'>
                                <li className='d-flex justify-content-between'>
                                    <p className='fs-3 mx-2'>Bánh mì Xúc Xích</p>
                                    <p className='fs-3 mx-2 text-success fw-nold'>12000Đ</p>
                                </li>
                                <li className='d-flex justify-content-between'>
                                    <p className='fs-3 mx-2'>Cơm B9</p>
                                    <p className='fs-3 mx-2 text-success fw-nold'>20000Đ</p>
                                </li>
                                <li className='d-flex justify-content-between'>
                                    <p className='fs-3 mx-2'>Bún Bò A15</p>
                                    <p className='fs-3 mx-2 text-success fw-nold'>25000Đ</p>
                                </li>
                            </ul>
                        </div>
                        <div className='col-lg-6 d-flex flex-column align-items-center mb-5 mb-lg-0'>
                            <h3 className='fs-2 mb-5'>Đồ uống</h3>
                            <ul className='px-0'>
                                <li className='d-flex justify-content-between'>
                                    <p className='fs-3 mx-2'>Coffee</p>
                                    <p className='fs-3 mx-2 text-success fw-nold'>10000Đ</p>
                                </li>
                                <li className='d-flex justify-content-between'>
                                    <p className='fs-3 mx-2'>Sinh tố</p>
                                    <p className='fs-3 mx-2 text-success fw-nold'>20000Đ</p>
                                </li>
                                <li className='d-flex justify-content-between'>
                                    <p className='fs-3 mx-2'>Coca</p>
                                    <p className='fs-3 mx-2 text-success fw-nold'>10000D</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold text-center mb-8">DANH SÁCH MÓN ĂN ĐỀ XUẤT</h1>
                <ProductCarousel />
            </div>

        </div>
    );
};

export default DashBoard;
