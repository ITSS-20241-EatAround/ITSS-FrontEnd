import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React from "react";
import store from "./redux-setup/store";
import { Provider } from "react-redux";
import Register from "./pages/register";
import Login from "./pages/login";
import ForgotPassword from "./pages/forget";
import DashBoard from "./pages/dashboard";
import NotFound from "./pages/not_found";
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <nav className="navbar">
          <ul className="navbar-nav">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/forgot-password">Forgot Password</Link></li>
          </ul>
        </nav> */}
        <Routes>

          <Route path="/" element={<DashBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App;