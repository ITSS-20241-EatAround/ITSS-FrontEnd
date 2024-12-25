import React, { useState, useEffect } from 'react';
import { getUserLocation } from '../../utils/func/geolocation';

const ProductSuggest = () => {
    const [product, setProducts] = useState([]);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = process.env.REACT_APP_API_TOKEN;
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const loc = await getUserLocation();
                setLocation(loc);
            } catch (err) {
                setError(err);
            }
        };
        fetchLocation();

        const fetchProducts = async () => {
            try {
                const response = await fetch('http://enmutsubi-kami.myddns.me:7200/api/v1/suggest/restaurant?latitude=${latitude}&longitude=${longitude}', {
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
                setProducts(data.data[0]);
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

    if (error) {
        return <div className="text-center py-6 text-red-600">Error: {error}</div>;
    }
    return (
        <div className="container mx-auto my-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="hidden lg:flex justify-center items-center">
                    <img src="/nha-an-bk.png" className="w-1/2 object-contain" alt="about img" />
                </div>

                <div className="flex flex-col items-center justify-center text-center lg:text-left">
                    <h2 className="text-4xl font-bold uppercase mb-5">Nhà hàng hàng đầu</h2>
                    <div>
                        <p className="text-lg font-semibold mb-2">
                            Tên nhà hàng: <span className="font-normal">{product.name}</span>
                        </p>

                        <p className="text-lg font-semibold mb-2">
                            Địa chỉ: <span className="font-normal">{product.address}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProductSuggest;