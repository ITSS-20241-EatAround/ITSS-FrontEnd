import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTokenFromLocalStorage } from '../../services/localtoken';
import Header from '../../shared/components/header';
import { RestaurantSuggest, DishSuggest } from '../../services/suggestApi';
import './index.css';
import { ImageGallery } from '../../shared/components/ImageGallery';
import 'bootstrap/dist/css/bootstrap.min.css';
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
            <div className='container my-5'>
                <div className='row'>
                    <div className='col-lg-6 d-flex justify-content-center d-none d-lg-flex'>
                        <img src="/nha-an-bk.png" className='img-fluid w-50' alt="about img" />
                    </div>
                    <div className='col-lg-6 d-flex flex-column align-items-center justify-content-center'>
                        <h2 className='fs-1 mb-5 text-uppercase fw-bold'>Nhà hàng hàng đầu</h2>

                        <p className='mb-5'>Nhà ăn Bách Khoa là 1 nhà ăn 5sao phục vụ cho sinh viên Bách Khoa</p>

                    </div>
                </div>
            </div>
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
            <ImageGallery />

        </div>
    );
};

export default DashBoard;
