import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { removeTokenFromLocalStorage } from '../../services/localtoken';
import { FaUserCircle } from 'react-icons/fa';
const priceOptions = [
    { label: "Thấp", value: 15000 },
    { label: "Trung bình", value: 30000 },
    { label: "Cao", value: 45000 },
    { label: "Rất cao", value: 60000 },
];

const Header = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        price: "",
        distance: "",
        rating: "",
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        const filterParams = new URLSearchParams();

        if (filters.price) {
            filterParams.append("minPrice", filters.price);
        }
        if (filters.distance) {
            filterParams.append("distance", filters.distance);
        }
        if (filters.rating) {
            filterParams.append("rating", filters.rating);
        }

        const queryString = filterParams.toString();
        navigate(`/search/${keyword.trim()}${queryString ? `?${queryString}` : ""}`);
    };
    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };
    
 
    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFilters((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (checked ? Number(value) : null) : value,
        }));
    };
    return (
        <>
            {/* Header */}
            < header className="bg-black p-4 shadow-md flex justify-between items-center text-white" >
                <div className="flex space-x-8">
                    <Link to="/" className="text-lg font-semibold hover:bg-gray-700 px-4 py-2 rounded">Home</Link>
                    <Link to="/restaurants" className="text-lg font-semibold hover:bg-gray-700 px-4 py-2 rounded">Danh sách nhà hàng</Link>
                    <form onSubmit={handleSubmit} class="flex items-center max-w-sm mx-auto">   
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-80">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                viewBox="0 0 1024 1024"
                                fill="currentColor"
                                height="1em"
                                width="1em"
                               
                                >
                                <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
                                </svg>
                            </div>
                            <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span class="sr-only">Search</span>
                        </button>
                        <div className='ml-3'>
                        <button type="button" onClick={toggleFilter} className="flex items-center justify-center rounded-lg border border-gray-200 bg-sky-500 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-sky-600 sm:w-auto">
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
                            <div className="absolute mt-5 w-48 rounded-lg border border-gray-300 bg-white shadow-lg p-4">
                                <h3 className="text-lg font-semibold mb-2 text-gray-700 ">
                                    Bộ lọc
                                </h3>
                            <div className="mb-3">
                                <h4 className="text-sm font-medium text-gray-600">
                                    Khoảng giá
                                </h4>
                                {priceOptions.map((price) => (
                                    <label key={price.value} className="block text-gray-600">
                                        <input
                                            type="checkbox"
                                            name="price"
                                            value={price.value} // Dùng giá trị số
                                            checked={filters.price === price.value}
                                            onChange={handleFilterChange}
                                            className="mr-2"
                                        />
                                        {price.label} {/* Hiển thị mô tả */}
                                    </label>
                                ))}
                            </div>
                            <div className="mb-3">
                                    <h4 className="text-sm font-medium text-gray-600">
                                        Khoảng cách
                                    </h4>
                                    <div className="text-gray-600">
                                        <input
                                            type="number"
                                            name="distance"
                                            onChange={handleFilterChange}
                                            className="border-2 border-gray-500 w-36"
                                        />
                                    </div>
                            </div>
                            <div className="mb-3">
                                                <h4 className="text-sm font-medium text-gray-600">
                                                    Đánh giá
                                                </h4>
                                                {["1 sao", "2 sao", "3 sao", "4 sao", "5 sao"].map((rating) => (
                                                    <label key={rating} className="block text-gray-600">
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
                                   
                                )}
                        </div>
                    </form>

                </div>
                {/* User Icon and Dropdown */}
                <div
                    className="relative"
                    onClick={() => setIsDropdownOpen((x) => !x)}
                >
                    <FaUserCircle className="text-3xl cursor-pointer text-white" />
                    {isDropdownOpen && (
                        <div className="absolute right-0 bg-gray-700 shadow-md rounded-lg mt-2 w-32">
                            <ul>
                                <li className="px-4 py-2 text-sm hover:bg-gray-500 hover:rounded-lg cursor-pointer"
                                    onClick={() => navigate('/setting')}
                                >Settings</li>
                                <li className="px-4 py-2 text-sm hover:bg-gray-500 hover:rounded-lg cursor-pointer"
                                    onClick={() => {
                                        removeTokenFromLocalStorage();
                                        navigate('/login');
                                    }}
                                >Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </header >
        </>
    );
}

export default Header;

