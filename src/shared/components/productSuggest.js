import React, { useState, useEffect } from 'react';
import { getTokenFromLocalStorage } from '../../services/localtoken';
import { RestaurantSuggest } from '../../services/suggestApi';
import { useNavigate } from 'react-router-dom';
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
        <div className="container mx-auto my-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Image Section */}
                <div className="hidden lg:flex justify-center items-center" onClick={() => handleClick(product[0].restaurant_id)}>
                    <img 
                        src={product[0].image_url || "https://posapp.vn/wp-content/uploads/2020/09/%C4%91%E1%BB%93ng-b%E1%BB%99-n%E1%BB%99i-th%E1%BA%A5t.jpg"} 
                        alt="restaurant" 
                        className="w-full lg:w-1/2 object-cover object-center  rounded-lg"
                    />
                </div>

                {/* Text Section */}
                <div className="flex flex-col items-center justify-center text-center lg:text-left">
                    <h2 className="text-4xl font-bold uppercase mb-5 text-primary">Nhà hàng hàng đầu</h2>
                    <div className="space-y-2">
                        <p className="text-lg font-semibold">
                            Tên nhà hàng: <span className="font-normal">{product[0].name}</span>
                        </p>
                        <p className="text-lg font-semibold">
                            Địa chỉ: <span className="font-normal">{product[0].address}</span>
                        </p>
                        <p className="text-lg font-semibold">
                            Rating: <span className="font-normal">{product[0].rating}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );

}
export default ProductSuggest;