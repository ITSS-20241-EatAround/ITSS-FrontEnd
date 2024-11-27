import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { removeTokenFromLocalStorage } from '../../services/localtoken';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    return (
        <>
            {/* Header */}
            < header className="bg-black p-4 shadow-md flex justify-between items-center text-white" >
                <div className="flex space-x-8">
                    <Link to="/" className="text-lg font-semibold hover:bg-gray-700 px-4 py-2 rounded">Home</Link>
                    <Link to="/restaurants" className="text-lg font-semibold hover:bg-gray-700 px-4 py-2 rounded">Danh sách nhà hàng</Link>
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
                                    onClick={() => navigate('setting')}
                                >Settings</li>
                                <li className="px-4 py-2 text-sm hover:bg-gray-500 hover:rounded-lg cursor-pointer"
                                    onClick={() => {
                                        removeTokenFromLocalStorage();
                                        navigate('login');
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

