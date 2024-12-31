import { useState } from "react";
import Header from "../../shared/components/header";
import Draggable from "react-draggable";
import { useNavigate } from 'react-router-dom';
import { RestaurantSuggest } from "../../services/suggestApi";
import { getTokenFromLocalStorage } from "../../services/localtoken";
import { useEffect } from "react";
import { getRestaurants } from "../../services/restaurant";
import { pipe } from "../../shared/utils/pipe";
function getUserLocation() {
    return new Promise((resolve, reject) => {
        if(!navigator.geolocation){
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
        )
    })
}
const Restaurants = () => {
    const navigate = useNavigate();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        price: "",
        distance: "",
        rating: "",
    });
    const [error, setError] = useState(null);
    const [restaurantList, setRestaurantList] = useState([]);
    const [activeTab, setActiveTab] = useState('Phù hợp nhất');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        switch (tab) {
            case 'Phù hợp nhất':
                fetchResSuggest();
                break;
            case 'Gần bạn':
                setFilters((prev) => ({
                    ...prev,
                    distance: '< 1km', 
                }));
                break;
            case 'Đánh giá cao':
                setFilters((prev) => ({
                    ...prev,
                    rating: '5 sao', 
                }));
                break;
            case 'Giá cả rẻ':
                setFilters((prev) => ({
                    ...prev,
                    price: 'Thấp', 
                }));
                break;
            default:
                setFilters({});
        }
    };
    const fetchResSuggest = async () => {
        try {
            const location = await getUserLocation();
            const latitude = location.latitude;
            const longitude = location.longitude;
            const response = await RestaurantSuggest(latitude, longitude);
            setRestaurantList(response.data.slice(0, 3));
            console.log(restaurantList);
            setError(null);
        } catch (error) {
            setError("Error fetching restaurants.");
        }
    }
    const fetchRestaurant = async () => {
        try {
            const location = await getUserLocation();
            const latitude = location.latitude;
            const longitude = location.longitude;
            console.log(latitude, longitude);
            const response = await getRestaurants(latitude, longitude);
            let filteredRestaurants = response.data;
            switch (activeTab) {
                case "Gần bạn":
                    filteredRestaurants = filteredRestaurants.filter(
                        restaurant => restaurant.distance < 1 // Lọc nhà hàng gần nhất (<1km)
                    );
                    break;
    
                case "Đánh giá cao":
                    filteredRestaurants = filteredRestaurants.filter(
                        restaurant => restaurant.rating <= 5 && restaurant.rating >=3  // Lọc nhà hàng có đánh giá cao nhất (>=5 sao)
                    );
                    break;
    
                case "Giá cả rẻ":
                    filteredRestaurants = filteredRestaurants.filter(
                        restaurant => restaurant.dishPrices.highest <= 20000 // Lọc nhà hàng có giá rẻ (<=20,000 VND)
                    );
                    break;
                default:
                 
                    break;
            }
    
            // Cập nhật danh sách nhà hàng sau khi lọc
            setRestaurantList(filteredRestaurants);
            setError(null);
        } catch (error) {
            setError("Error fetching restaurants.");
        }
    };
    
    useEffect(() => {
        const token = getTokenFromLocalStorage();
        if (!token) {
            navigate('/login');
        }
        
            fetchRestaurant();
 

    }, [filters])

    return (
        <div 
            className="min-h-screen bg-cover bg-center bg-fixed"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7)), url('/backgr2.jpg')`
            }}
        >
            <Header/>
            <section className="py-8 antialiased md:py-12">
                <div className="mx-auto max-w-5xl px-4 2xl:px-0">
                    <div className="mb-8 flex justify-between items-center">
                        <h2 className="text-3xl font-bold text-gray-800 relative">
                            Restaurants
                            
                        </h2>
                    </div>

                    {/* Filter Panel */}
                    {isFilterOpen && (
                        <Draggable>
                            <div className="fixed top-24 right-4 z-50 w-64 rounded-xl border bg-white/90 backdrop-blur-sm shadow-xl p-4">
                                {/* ... existing filter content ... */}
                            </div>
                        </Draggable>
                    )}

                    {/* Navigation Tabs */}
                    <div className="mb-8">
                        <div className="flex space-x-6 border-b border-gray-200">
                            {['Phù hợp nhất', 'Gần bạn', 'Đánh giá cao', 'Giá cả rẻ'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => handleTabClick(tab)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-orange-500 transition-colors duration-300"
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Restaurant List */}
                    <div className="space-y-6">
                        {restaurantList.map((restaurant) => (
                            <div 
                                key={restaurant.restaurant_id}
                                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                                onClick={() => navigate(`/restaurant-detail/${restaurant.restaurant_id}`)}
                            >
                                <div className="flex">
                                    <div className="w-1/3">
                                        <img 
                                            src={restaurant.image_url} 
                                            alt={restaurant.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="w-2/3 p-6 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-bold text-gray-800 hover:text-orange-500 transition-colors duration-300">
                                                    {restaurant.name}
                                                </h3>
                                                <div className="flex items-center gap-1 bg-gray-700 text-white px-3 py-1 rounded-full">
                                                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span className="font-semibold">{restaurant.rating}</span>
                                                </div>

                                            </div>
                                            <p className="text-gray-600 mb-4">{restaurant.description}</p>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span>{restaurant.address}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>{Number(restaurant.distance).toFixed(1)} km</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mt-4">
                                            <div className="text-orange-500 font-semibold">
                                            {pipe(restaurant?.dishPrices.lowest)}đ - {pipe(restaurant?.dishPrices.highest)}đ

                                            </div>
                                            <button className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-black transition-colors duration-300">
                                                View Menu
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Restaurants;