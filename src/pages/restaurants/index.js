import { useEffect, useState } from "react";
import Header from "../../shared/components/header";
import Draggable from "react-draggable";
import { getRestaurants } from "../../services/restaurantAPI";
import { getTokenFromLocalStorage } from "../../services/localtoken";
import { useNavigate } from 'react-router-dom';
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
        setFilters({
            ...filters,
            [name]: value,
        });
    };
    const fetchRestaurant = async () => {
        try {
            const location = await getUserLocation();
            const latitude = location.latitude;
            const longitude = location.longitude;
            console.log(latitude, longitude)
            const response = await getRestaurants(latitude,longitude);
            setRestaurantList(response.data);
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
                                        type="radio"
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
                                        type="radio"
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
                                        type="radio"
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

                       
                        <div className="flex justify-between">
                            <button
                                onClick={() => {
                                    console.log("Filters applied:", filters);
                                    toggleFilter();
                                }}
                                className="rounded bg-blue-500 px-3 py-1 text-white text-sm hover:bg-blue-600"
                            >
                                Áp dụng
                            </button>
                            <button
                                onClick={toggleFilter}
                                className="rounded bg-gray-300 px-3 py-1 text-gray-700 text-sm hover:bg-gray-400"
                            >
                                Đóng
                            </button>
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
                                <a href="#">
                                    <img className="mx-auto h-full dark:hidden" src={restaurant.image_url} alt="" />
                                    <img className="mx-auto hidden h-full dark:block" src={restaurant.image_url} alt="" />
                                </a>
                            </div>
                            <div className="pt-6">
                                <div className="mb-4 flex items-center justify-between gap-4">
                                    <div className="flex items-center justify-end gap-1">
                                        <button type="button" data-tooltip-target="tooltip-quick-look" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <span className="sr-only"> Quick look </span>
                                            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                                <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        </button>
                                </div>
                            </div>
                                <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{restaurant.name}</a>
                                    <div className="mt-2 flex items-center gap-2">
                                    <div className="flex items-center">
            {[...Array(5)].map((_, starIndex) => (
              <svg
                key={starIndex}
                className={`h-4 w-4 ${
                  starIndex < Math.round(restaurant.rating || 0)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
              </svg>
            ))}
          </div>
                    
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{restaurant.rating}</p>
                                       
                                    </div>
                                    <ul className="mt-2 flex items-center gap-4">
                                                <li className="flex items-center gap-2">
                                                <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                                </svg>
                                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{restaurant.address}</p>
                                                </li>
                    
                                                <li className="flex items-center gap-2">
                                                <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                                </svg>
                                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Distance: {Number(restaurant.distance) > 1 ? `${Number(restaurant.distance).toFixed(2)} km` : `${(Number(restaurant.distance) * 1000).toFixed(0)} m`}</p>
                                                </li>
                                    </ul>
                                    <div className="mt-4 flex items-center justify-between gap-4">
                                                <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">Price: {restaurant.dishPrices.lowest}-{restaurant.dishPrices.highest}</p>
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
