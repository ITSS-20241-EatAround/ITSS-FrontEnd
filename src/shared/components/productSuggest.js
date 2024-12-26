import React, { useState, useEffect } from 'react';
import { getTokenFromLocalStorage } from '../../services/localtoken';
import { RestaurantSuggest } from '../../services/suggestApi';
import { useNavigate } from 'react-router-dom';
import RestaurantCarousel from './restaurantCarousel';
const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            return reject(new Error('Cannot get location'));
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                reject(error.message);
            }
        );
    });
}

const ProductSuggest = () => {
    const [product, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = getTokenFromLocalStorage();
    const navigate = useNavigate();
    const handleClick = (restaurantId) => {
        navigate(`/restaurant-detail/${restaurantId}`);
    };
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const location = await getUserLocation();
                const latitude = location.latitude;
                const longitude = location.longitude;
                const response = await RestaurantSuggest(latitude, longitude);
                console.log(response);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchProducts();
        const intervalId = setInterval(fetchProducts, 86400000); // 1 ngày
        return () => {
            clearInterval(intervalId);
        };

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
                <h2 className="text-4xl font-bold uppercase mb-5 text-primary ">Nhà hàng hàng đầu</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10" onClick={() => handleClick(product[0].restaurant_id)}>
                    {/* Image Section with Text Overlay */}
                    <div className="relative flex justify-center items-center">
                        <img
                            src={product[0].image_url || "https://posapp.vn/wp-content/uploads/2020/09/%C4%91%E1%BB%93ng-b%E1%BB%99-n%E1%BB%99i-th%E1%BA%A5t.jpg"}
                            alt="restaurant"
                            className="w-full lg:w-3/4 object-cover object-center rounded-lg"
                        />
                        {/* Text Overlay */}
                        <div className="absolute top-5 left-5 bg-black bg-opacity-50 text-white p-3 rounded-md">
                            <p className="text-sm">Đánh giá</p>
                            <p className="text-xl font-bold">{product[0].rating} <span className="text-yellow-500 text-lg">
                                ★
                            </span></p>
                        </div>
                    </div>

                    {/* Text Section */}
                    <div className="flex flex-col justify-start lg:justify-center text-center lg:text-left">
                        <div className="space-y-2">
                            <p className="text-lg font-semibold">
                                Tên nhà hàng: <span className="font-normal">{product[0].name}</span>
                            </p>
                            <p className="text-lg font-semibold">
                                Địa chỉ: <span className="font-normal">{product[0].address}</span>
                            </p>
                            <p className="text-lg font-semibold">
                                Liên hệ: <span className="font-normal">{product[0].contact || "Không có thông tin liên hệ"}</span>
                            </p>
                            <p className="text-lg font-semibold">
                                Khoảng cách: <span className="font-normal">{+product[0].distance < 1 ? (+product[0].distance * 1000).toFixed(0) + "m" : (+product[0].distance).toFixed(0) + "km"}</span>
                            </p>
                            <p className="text-lg font-semibold">
                                Giá: <span className="font-normal">{(+product[0].dishPrices.lowest).toFixed(0) + " - " + (+product[0].dishPrices.highest).toFixed(0)}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <RestaurantCarousel products={product}/>
        </>
    );

}
export default ProductSuggest;