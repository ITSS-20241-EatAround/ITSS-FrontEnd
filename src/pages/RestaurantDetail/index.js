import React, { useState } from "react";
const restaurant = {
  name: "Restaurant Test",
  address: "ĐHBKHN",
  rating: "4.9 ★",
  priceRange: "20.000 - 100.000",
  image: "https://assets.gia-hanoi.com/10-1.png",
};

const menuItems = [
  {
    id: 1,
    name: "Dish 1",
    price: "50.000",
    description: "Dish 1",
    image: "https://down-tx-vn.img.susercontent.com/vn-11134513-7r98o-lsv21q8k90uxa6@resize_ss640x400!@crop_w640_h400_cT",
  },
  {
    id: 2,
    name: "Dish 2",
    price: "60.000",
    description: "Dish 2",
    image: "https://down-tx-vn.img.susercontent.com/vn-11134513-7r98o-lsv21q8k90uxa6@resize_ss640x400!@crop_w640_h400_cT",
  },
  {
    id: 3,
    name: "Dish 3",
    price: "70.000",
    description: "Dish 3",
    image: "https://down-tx-vn.img.susercontent.com/vn-11134513-7r98o-lsv21q8k90uxa6@resize_ss640x400!@crop_w640_h400_cT",
  },
  {
    id: 4,
    name: "Dish 4",
    price: "80.000",
    description: "Dish 4",
    image: "https://down-tx-vn.img.susercontent.com/vn-11134513-7r98o-lsv21q8k90uxa6@resize_ss640x400!@crop_w640_h400_cT",
  },
];

const RestaurantDetail = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Thông tin nhà hàng */}
      <div className="flex items-center justify-center mb-8">
        <div className="bg-white shadow-md p-6 rounded-lg max-w-screen-md w-full relative">
          <div className="flex items-center gap-6">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-64 h-40 object-cover rounded-lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{restaurant.name}</h1>
              <p className="text-gray-600 mt-2">{restaurant.address}</p>
              <p className="text-yellow-500 font-bold mt-1">
                {restaurant.rating} 
              </p>
              <p className="text-gray-700 mt-1"> Giá: {restaurant.priceRange} Đ</p>
            </div>
          </div>

          {}
          <button
            onClick={toggleFavorite}
            className="absolute bottom-4 right-4 text-3xl focus:outline-none"
          >
            {isFavorite ? (
              <span className="text-red-500">❤️</span>
            ) : (
              <span className="text-gray-400 hover:text-red-500">🤍</span>
            )}
          </button>
        </div>
      </div>

      {/* Danh sách món ăn */}
      <h2 className="text-2xl font-bold mb-4 text-center">Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-screen-lg mx-auto">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 flex items-center gap-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              <p className="text-red-500 font-bold mt-2">{item.price} Đ</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetail;
