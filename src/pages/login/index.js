import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { LoginAPI } from "../../services/authApi";
import { saveTokenToLocalStorage } from "../../services/localtoken";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (/\s/.test(username)) {
      setError("Username cannot contain spaces.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    LoginAPI({
      email: username,
      password: password
    }).then(({data}) => {
      if(data.success) {
        saveTokenToLocalStorage(data.accessToken);
        navigate('/');
      }
    }).catch(({response}) => {
      setError(response.data.message);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{
      backgroundImage: "url('/bgr.jpg')",
    }}>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="flex items-center space-x-2">
            <PersonIcon className="text-gray-500" />
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex items-center space-x-2">
            <LockOutlinedIcon className="text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Hiển thị lỗi nếu có */}
          {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
          >
            <PersonIcon className="mr-2" />
            Login
          </button>
        </form>

        <div className="mt-2 text-center">
          <Link to="/forgot-password" className="text-red-500 hover:underline">
            Forgot your password?
          </Link>
        </div>

        {/* Link quay lại trang đăng ký */}
        <div className="mt-4 text-center">
          <Link to="/register" className="text-blue-500 hover:underline">
            Don't have an account? Register here.
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;
