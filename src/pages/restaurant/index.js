import { useState } from "react";
import Header from "../../shared/components/header";
import Draggable from "react-draggable";
import { useNavigate } from 'react-router-dom';

const Restaurants = () => {
    const navigate = useNavigate();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        price: "",
        distance: "",
        rating: "",
    });

    // Mock data for restaurants
    const restaurantList = [
        {
            restaurant_id: 1,
            name: "Pasta Pesto",
            image_url: "/restaurant1.jpg",
            rating: 4.5,
            address: "1234 Main St, San Francisco, CA",
            distance: 0.8,
            dishPrices: {
                lowest: 20000,
                highest: 50000
            },
            description: "Authentic Italian cuisine with a modern twist. Known for handmade pasta and fresh ingredients."
        },
        {
            restaurant_id: 2,
            name: "Taco Time",
            image_url: "/restaurant2.jpg",
            rating: 4.2,
            address: "5678 Market St, San Francisco, CA",
            distance: 1.2,
            dishPrices: {
                lowest: 15000,
                highest: 40000
            },
            description: "Best Mexican street food in town. Fresh ingredients, daily made tortillas."
        },
        // Thêm 3 nhà hàng mới
        {
            restaurant_id: 3,
            name: "Sushi Master",
            image_url: "/restaurant1.jpg",
            rating: 4.8,
            address: "789 Sushi Lane, San Francisco, CA",
            distance: 0.5,
            dishPrices: {
                lowest: 25000,
                highest: 150000
            },
            description: "Premium Japanese sushi restaurant with fresh seafood imported daily. Expert sushi chefs with 20+ years experience."
        },
        {
            restaurant_id: 4,
            name: "Pho Delights",
            image_url: "/restaurant1.jpg",
            rating: 4.6,
            address: "321 Asian Avenue, San Francisco, CA",
            distance: 1.5,
            dishPrices: {
                lowest: 18000,
                highest: 45000
            },
            description: "Authentic Vietnamese cuisine featuring traditional pho and spring rolls. Family recipes passed down through generations."
        },
        {
            restaurant_id: 5,
            name: "BBQ Kingdom",
            image_url: "/restaurant1.jpg",
            rating: 4.7,
            address: "456 Grill Street, San Francisco, CA",
            distance: 2.0,
            dishPrices: {
                lowest: 30000,
                highest: 200000
            },
            description: "Premium BBQ restaurant specializing in smoked meats and homemade sauces. Perfect for meat lovers and family gatherings."
        }
    ];

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: prevFilters[name] === value ? "" : value,
        }));
    };

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
                                                {restaurant.dishPrices.lowest.toLocaleString()}đ - {restaurant.dishPrices.highest.toLocaleString()}đ
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