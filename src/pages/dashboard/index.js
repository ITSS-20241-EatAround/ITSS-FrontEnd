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
            <ProductCarousel/>
        </div>
    );
};

export default DashBoard;
