import Header from "../../shared/components/header";
import { getTokenFromLocalStorage } from "../../services/localtoken";
import {jwtDecode} from 'jwt-decode';
import { useState, useEffect } from "react";
import { ChangeAPI } from "../../services/authApi";
import { useNavigate } from 'react-router-dom';
const Setting = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
    const token = getTokenFromLocalStorage();
    console.log(token)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ChangeAPI(currentPassword, newPassword, token);
            alert("Password changed successfully!");
        } catch (error) {
            const httpStatus = error.response?.status;
            const errorMessage = error.response?.data?.message;
            alert(`Error ${httpStatus}: ${errorMessage}`);
        }
    }
    useEffect(() => {

        if (!token) {
            navigate('/login');
        }
        //console.log(token)
        if (token) {
            try {
              const decoded = jwtDecode(token);
              console.log(decoded);
              setUsername(decoded.name);
              setEmail(decoded.email);
            } catch (error) {
              console.error("Invalid Token:", error);
            }
          } else {
            console.log("No token found.");
          }
    }, [])


    return(
        <div>
            <Header/>
            <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
            <div className="mx-4 max-w-screen-xl sm:mx-8 xl:mx-auto mb-5 translate-x-12">
            <h1 className=" py-5 text-4xl font-semibold text-white">Settings</h1>
            <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
                <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow dark:bg-gray-700">
                    <div className="pt-4 text-white">
                        <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
                        <p className="font- text-white">Edit your account.</p>
                    </div>
                    <div className="flex justify-center py-4">
                        <img src="https://www.vlance.vn/uploads/portfolio/view/c4a875224357fa0f1dce59defcb7a42b3d6d2cab1.jpg" alt="User Avatar" className="h-40 w-40 rounded-full border-2 border-gray-300 object-cover"/>
                    </div>
                    <hr className="mt-4 mb-8" />
                    <p className="py-2 text-xl font-semibold text-white">Email Address</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <label for="email">
                            <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                <input value={email} type="email" readOnly id="email"  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" />
                            </div>
                        </label>
                    </div>
                    <hr className="mt-4 mb-8" />
                    <p className="py-2 text-xl font-semibold text-white">Name User</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <label for="name">
                            <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                <input value={username} type="name" readOnly id="name"  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" />
                            </div>
                        </label>
                    </div>
                    <form onSubmit={handleSubmit}>
                    <hr className="mt-4 mb-8" />
                        <p className="py-2 text-xl font-semibold text-white">Password</p>
                        <div className="flex items-center">
                            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                                <label for="login-password">
                                    <span className="text-sm text-white">Current Password</span>
                                    <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                        <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" />
                                    </div>
                                </label>
                                <label for="login-password">
                                    <span className="text-sm text-white">New Password</span>
                                    <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                        <input type="password"  value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" />
                                    </div>
                                </label>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        </div>
                        <button type="submit" className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">Save Password</button>
                    <hr className="mt-4 mb-8" />
                    </form>

                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Setting;