import React from "react";
import { useNavigate } from "react-router-dom";

const NoDishesPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center space-y-5">
                {/* Icon or Image */}
                <div className="text-red-500 text-6xl">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-16 h-16 mx-auto"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5m6.75-7.5a9 9 0 11-13.5 0 9 9 0 0113.5 0z"
                        />
                    </svg>
                </div>

                {/* Message */}
                <h1 className="text-2xl font-bold text-gray-800">
                    Không có món ăn nào!
                </h1>
                <p className="text-gray-600">
                    Hiện tại nhà hàng này không có món ăn nào được hiển thị.
                </p>

                {/* Button to Redirect */}
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
                >
                    Quay về Trang chủ
                </button>
            </div>
        </div>
    );
};

export default NoDishesPage;
