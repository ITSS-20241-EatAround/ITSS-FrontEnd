import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { ForgetAPI } from "../../services/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    ForgetAPI({ email })
      .then(() => {
        navigate('/login');
      })
      .catch(({ response }) => {
        setError(response.data.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{
      backgroundImage: "url('/bgr.jpg')",
    }}>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Forgot Password</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="flex items-center space-x-2">
            <MailOutlineIcon className="text-gray-500" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Hiển thị lỗi nếu có */}
          {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
          >
            Send Reset Password
          </button>
        </form>

        {/* Link quay lại trang đăng nhập */}
        <div className="mt-4 text-center">
          <span className="text-blue-500 hover:underline cursor-pointer" onClick={() => navigate("/login")}>
            Back to Login
          </span>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
