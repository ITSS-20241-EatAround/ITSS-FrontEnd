import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import store from "./redux-setup/store";
import { Provider } from "react-redux";
import Register from "./pages/register";
import Login from "./pages/login";
import ForgotPassword from "./pages/forget";
import DashBoard from "./pages/dashboard";
import NotFound from "./pages/not_found";
import RestaurantDetail from "./pages/RestaurantDetail";
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<DashBoard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/RestaurantDetail" element={<RestaurantDetail />} />
      </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App;