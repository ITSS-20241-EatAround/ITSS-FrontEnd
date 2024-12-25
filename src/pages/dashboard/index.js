import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTokenFromLocalStorage } from '../../services/localtoken';
import Header from '../../shared/components/header';
import ProductCarousel from '../../shared/components/productCarousel';
import ProductSuggest from '../../shared/components/productSuggest';
const DashBoard = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = getTokenFromLocalStorage();
        if (!token) {
            navigate('/login');
        }
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <section className=" bg-imgPage bg-cover bg-center h-screen flex items-center text-center text-gray-800">
                <div className="flex flex-col items-center ml-8">
                    <div className="w-full text-center">
                        <h2 className="text-white text-3xl font-semibold">Welcome To</h2>
                        <h1 className="text-white text-7xl font-bold">ITSS Restaurant</h1>
                    </div>
                </div>
            </section>
            <ProductSuggest/>
            <div className='bg-foodImg py-5 text-white bg-cover bg-center'>
                <div className="container mx-auto flex flex-col items-center">
                    <h2 className="text-4xl font-bold uppercase mb-5">Món ăn hàng đầu</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full mb-5">
                        <div className="flex flex-col items-center mb-5 lg:mb-0">
                            <h3 className="text-3xl mb-5">Đồ ăn</h3>
                            <ul className="list-none px-0">
                                <li className="flex justify-between mb-3">
                                    <p className="text-2xl mx-2">Bánh mì Xúc Xích</p>
                                    <p className="text-2xl mx-2 text-green-500 font-bold">12000Đ</p>
                                </li>
                                <li className="flex justify-between mb-3">
                                    <p className="text-2xl mx-2">Cơm B9</p>
                                    <p className="text-2xl mx-2 text-green-500 font-bold">20000Đ</p>
                                </li>
                                <li className="flex justify-between mb-3">
                                    <p className="text-2xl mx-2">Bún Bò A15</p>
                                    <p className="text-2xl mx-2 text-green-500 font-bold">25000Đ</p>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col items-center">
                            <h3 className="text-3xl mb-5">Đồ ăn</h3>
                            <ul className="list-none px-0">
                                <li className="flex justify-between mb-3">
                                    <p className="text-2xl mx-2">Coffee</p>
                                    <p className="text-2xl mx-2 text-green-500 font-bold">10000Đ</p>
                                </li>
                                <li className="flex justify-between mb-3">
                                    <p className="text-2xl mx-2">Sinh tố</p>
                                    <p className="text-2xl mx-2 text-green-500 font-bold">20000Đ</p>
                                </li>
                                <li className="flex justify-between mb-3">
                                    <p className="text-2xl mx-2">Coca</p>
                                    <p className="text-2xl mx-2 text-green-500 font-bold">10000D</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <ProductCarousel/>
        </div>
    );
};

export default DashBoard;
