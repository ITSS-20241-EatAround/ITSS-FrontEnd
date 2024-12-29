import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { removeTokenFromLocalStorage } from '../../services/localtoken';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const queryString = keyword.trim() ? `?keyword=${keyword.trim()}` : "";
        navigate(`/search${queryString}`);
    };

    return (
        <header className="bg-gray-800 backdrop-blur-md shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Navigation */}
                    <div className="flex items-center space-x-8">
                        {/* Logo */}
                        <Link to="/" className="flex items-center">
                            <svg 
                                className="w-8 h-8 text-orange-300" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M13.966 17.036c-3.867 0-7-3.133-7-7 0-3.868 3.133-7 7-7s7 3.132 7 7c0 3.867-3.133 7-7 7zM4.813 20.186l3.878-3.878" 
                                />
                            </svg>
                            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-700 bg-clip-text text-transparent">
                                FoodieFind
                            </span>
                        </Link>

                        {/* Navigation Links */}
                        <nav className="hidden md:flex space-x-8">
                            <Link 
                                to="/" 
                                className="text-white hover:text-orange-300 px-3 py-2 text-lg font-medium transition-colors duration-300"
                            >
                                Home
                            </Link>
                            <Link 
                                to="/restaurants" 
                                className="text-white hover:text-orange-300 px-3 py-2 text-lg font-medium transition-colors duration-300"
                            >
                                Restaurant List
                            </Link>
                        </nav>
                    </div>

                    {/* Search and Profile */}
                    <div className="flex items-center space-x-6">
                        {/* Search Bar */}
                        <form onSubmit={handleSubmit} className="hidden md:block">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    placeholder="Search restaurants..."
                                    className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </form>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center space-x-2 focus:outline-none"
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 p-0.5">
                                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                        <FaUserCircle className="w-8 h-8 text-orange-500" />
                                    </div>
                                </div>
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm text-gray-700 font-medium">John Doe</p>
                                        <p className="text-xs text-gray-500">john@example.com</p>
                                    </div>
                                    <a
                                        href="#settings"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 transition-colors duration-200"
                                    >
                                        Settings
                                    </a>
                                    <button
                                        onClick={() => {
                                            removeTokenFromLocalStorage();
                                            navigate('/login');
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
