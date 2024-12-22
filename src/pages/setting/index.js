import Header from "../../shared/components/header";
const setting = () => {
    return(
        <div>
            <Header/>
            <div className="dark:bg-gray-900">
            <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto ">
            <h1 className="border-b py-6 text-4xl font-semibold text-white">Settings</h1>
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
                        <p className="text-white">Your email address is <strong>john.doe@company.com</strong></p>
                    </div>
                    <hr className="mt-4 mb-8" />
                        <p className="py-2 text-xl font-semibold text-white">Password</p>
                        <div className="flex items-center">
                            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                                <label for="login-password">
                                    <span className="text-sm text-white">Current Password</span>
                                    <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                        <input type="password" id="login-password" className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" />
                                    </div>
                                </label>
                                <label for="login-password">
                                    <span className="text-sm text-white">New Password</span>
                                    <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                        <input type="password" id="login-password" className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" />
                                    </div>
                                </label>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        </div>
                        <p className="mt-2 text-white">Can't remember your current password. <a className="text-sm font-semibold text-blue-600 underline decoration-2" href="#">Recover Account</a></p>
                        <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">Save Password</button>
                        <hr className="mt-4 mb-8" />
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default setting;