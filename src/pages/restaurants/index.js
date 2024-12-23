import { useEffect, useState } from "react";
import Header from "../../shared/components/header";
import Draggable from "react-draggable";
import { getRestaurants } from "../../services/restaurantAPI";
import { getTokenFromLocalStorage } from "../../services/localtoken";
import { useNavigate, Link } from 'react-router-dom';
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
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        price: "",
        distance: "",
        rating: "",
    });

    const navigate = useNavigate();
    const [restaurantList, setRestaurantList] = useState([]);
    const [error, setError] = useState(null);
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

    const fetchRestaurant = async () => {
        try {
            const location = await getUserLocation();
            const latitude = location.latitude;
            const longitude = location.longitude;
            console.log(latitude, longitude)
            const response = await getRestaurants(latitude,longitude);
            let filteredRestaurants = response.data;
            
            if (filters.price) {
                if (filters.price === "Thấp") {
                    filteredRestaurants = filteredRestaurants.filter(restaurant => restaurant.dishPrices.highest <= 20000);
                } else if (filters.price === "Trung bình") {
                    filteredRestaurants = filteredRestaurants.filter(restaurant => restaurant.dishPrices.lowest> 20000 &&  restaurant.dishPrices.highest<= 50000);
                } else if (filters.price === "Cao") {
                    filteredRestaurants = filteredRestaurants.filter(restaurant => restaurant.dishPrices.lowest > 30000 && restaurant.dishPrices.highest<= 60000);
                } else if (filters.price === "Rất cao") {
                    filteredRestaurants = filteredRestaurants.filter(restaurant => restaurant.dishPrices.highest > 60000);
                }
            
            }
            if (filters.distance) {
                filteredRestaurants = filteredRestaurants.filter(restaurant => {
                    if (filters.distance === "< 1km") return restaurant.distance < 1;
                    if (filters.distance === "1 - 5km") return restaurant.distance >= 1 && restaurant.distance <= 5;
                    if (filters.distance === "5 - 10km") return restaurant.distance > 5 && restaurant.distance <= 10;
                    if (filters.distance === "> 10km") return restaurant.distance > 10;
                        return true;
                });
            }
            if (filters.rating) {
                const ratingValue = parseInt(filters.rating.charAt(0));
                filteredRestaurants = filteredRestaurants.filter(restaurant => restaurant.rating >= ratingValue);
            }
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
        <div>
            <Header/>
            <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="relative mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">

                    <button type="button" onClick={toggleFilter} className="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 sm:w-auto">
                    <svg
                        className="-ms-0.5 me-2 h-4 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
                    />
                    </svg>
                    Filters
                    </button>

            
            {isFilterOpen && (
                <Draggable>
                    <div className="absolute top-12 left-0 z-50 w-64 rounded-lg border border-gray-300 bg-white shadow-lg p-4">
                        <h3 className="text-lg font-semibold mb-2 text-gray-700 ">
                            Bộ lọc
                        </h3>

                        
                        <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-600">
                                Khoảng giá
                            </h4>
                            {["Thấp", "Trung bình", "Cao", "Rất cao"].map((price) => (
                                <label key={price} className="block text-sm">
                                    <input
                                        type="checkbox"
                                        name="price"
                                        value={price}
                                        checked={filters.price === price}
                                        onChange={handleFilterChange}
                                        className="mr-2"
                                    />
                                    {price}
                                </label>
                            ))}
                        </div>

                     
                        <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-600">
                                Khoảng cách
                            </h4>
                            {["< 1km", "1 - 5km", "5 - 10km", "> 10km"].map((distance) => (
                                <label key={distance} className="block text-sm">
                                    <input
                                        type="checkbox"
                                        name="distance"
                                        value={distance}
                                        checked={filters.distance === distance}
                                        onChange={handleFilterChange}
                                        className="mr-2"
                                    />
                                    {distance}
                                </label>
                            ))}
                        </div>

                       
                        <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-600">
                                Đánh giá
                            </h4>
                            {["1 sao", "2 sao", "3 sao", "4 sao", "5 sao"].map((rating) => (
                                <label key={rating} className="block text-sm">
                                    <input
                                        type="checkbox"
                                        name="rating"
                                        value={rating}
                                        checked={filters.rating === rating}
                                        onChange={handleFilterChange}
                                        className="mr-2"
                                    />
                                    {rating}
                                </label>
                            ))}
                        </div>
                    </div>
                </Draggable>
            )}
                </div>
            {/* List nhà hàng*/}
                <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                    {restaurantList.map((restaurant, index) => (
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="h-56 w-full">
                                <a onClick={() => {
                                    navigate(`/restaurant-detail/${restaurant.restaurant_id}`)
                                }}>
                                    <img className="mx-auto h-full dark:hidden" src={restaurant.image_url} alt="" />
                                    <img className="mx-auto hidden h-full dark:block" src={restaurant.image_url} alt="" />
                                </a>
                            </div>
                            <div className="pt-6">
                                <div className="mb-4 flex items-center justify-between gap-4">
                                    <div className="flex items-center justify-end gap-1">
                                        <button type="button"  onClick={() => {navigate(`/restaurant-detail/${restaurant.restaurant_id}`)}} data-tooltip-target="tooltip-quick-look" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <span className="sr-only"> Quick look </span>
                                            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                                <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        </button>
                                </div>
                            </div>
                                <a onClick={() => {
                                    navigate(`/restaurant-detail/${restaurant.restaurant_id}`)
                                }} className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{restaurant.name}</a>
                                    <div className="mt-2 flex items-center gap-2">
                                    <div className="flex items-center">
                                    {[...Array(5)].map((_, starIndex) => {
                                        const rating = restaurant.rating || 0;
                                        const isFull = starIndex < Math.floor(rating);
                                        const isHalf = starIndex < rating && starIndex >= Math.floor(rating);

                                        return (
                                            <div key={starIndex} className="relative inline-block h-4 w-4">
                                            
                                            <svg
                                                className="absolute top-0 left-0 h-4 w-4 text-gray-300"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                            </svg>

                                          
                                            <svg
                                                className={`absolute top-0 left-0 h-4 w-4 ${
                                                isFull || isHalf ? "text-yellow-400" : "text-transparent"
                                                }`}
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                                style={isHalf ? { clipPath: "inset(0 50% 0 0)" } : {}}
                                            >
                                                <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                            </svg>
                                            </div>
                                        );
                                    })}


                                    </div>
                    
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{restaurant.rating}</p>
                                       
                                    </div>
                                    <div className="mt-2">
                                        <div className="flex items-center gap-2 mb-2">
                                        <svg
                                        viewBox="0 0 24 24"
                                        fill="white"
                                        height="1.3em"
                                        width="1.3em"
                                       
                                        >
                                        <path d="M12 2C7.589 2 4 5.589 4 9.995 3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12 0-4.411-3.589-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                                        </svg>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{restaurant.address}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                        <svg
                                        viewBox="0 0 24 24"
                                        fill="white"
                                        height="1.3em"
                                        width="1.3em"
                                        
                                        >
                                        <path d="M6.5 8.11c-.89 0-1.61-.72-1.61-1.61A1.61 1.61 0 016.5 4.89c.89 0 1.61.72 1.61 1.61A1.61 1.61 0 016.5 8.11M6.5 2C4 2 2 4 2 6.5c0 3.37 4.5 8.36 4.5 8.36S11 9.87 11 6.5C11 4 9 2 6.5 2m11 6.11a1.61 1.61 0 01-1.61-1.61 1.609 1.609 0 113.22 0 1.61 1.61 0 01-1.61 1.61m0-6.11C15 2 13 4 13 6.5c0 3.37 4.5 8.36 4.5 8.36S22 9.87 22 6.5C22 4 20 2 17.5 2m0 14c-1.27 0-2.4.8-2.82 2H9.32a3 3 0 00-3.82-1.83A3.003 3.003 0 003.66 20a3.017 3.017 0 003.84 1.83c.85-.3 1.5-.98 1.82-1.83h5.37c.55 1.56 2.27 2.38 3.81 1.83A3 3 0 0020.35 18c-.43-1.2-1.57-2-2.85-2m0 4.5A1.5 1.5 0 0116 19a1.5 1.5 0 011.5-1.5A1.5 1.5 0 0119 19a1.5 1.5 0 01-1.5 1.5z" />
                                        </svg>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{Number(restaurant.distance) > 1 ? `${Number(restaurant.distance).toFixed(2)} km` : `${(Number(restaurant.distance) * 1000).toFixed(0)} m`}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                        <svg
                                        viewBox="0 0 16 16"
                                        fill="white"
                                        height="1em"
                                        width="1em"
                                        
                                        >
                                        <path
                                            fill="white"
                                            d="M15.25 0h-6c-.412 0-.989.239-1.28.53L.531 7.969a.752.752 0 000 1.061l6.439 6.439a.752.752 0 001.061 0L15.47 8.03c.292-.292.53-.868.53-1.28v-6a.753.753 0 00-.75-.75zM11.5 6a1.5 1.5 0 11.001-3.001A1.5 1.5 0 0111.5 6z"
                                        />
                                        </svg>
                                        <p className="text-0.8xl leading-tight text-gray-900 dark:text-white">{restaurant.dishPrices.lowest}-{restaurant.dishPrices.highest} VNĐ</p>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    ))}

                </div>
            {/* List nhà hàng*/}

            </div>
            </section>
            </div>
    )
};

export default Restaurants;
