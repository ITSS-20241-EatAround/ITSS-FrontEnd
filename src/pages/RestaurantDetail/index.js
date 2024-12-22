import React, { useState, useEffect } from "react";
import Header from "../../shared/components/header";
import { restaurantDetail } from "../../services/restaurantDetail";
import { useParams } from "react-router-dom";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-500 text-lg">
            ★
          </span>
        ))}
      {halfStar && (
        <span className="text-yellow-500 text-lg">☆</span>
      )}
      {Array(emptyStars)
        .fill()
        .map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300 text-lg">
            ★
          </span>
        ))}
    </div>
  );
};

const RestaurantDetail = () => {
  const { id } = useParams();
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const data = await restaurantDetail(id);
        setDishes(data.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchDish();
  }, [id]);

  if (!dishes.length) return <div>No dishes found.</div>;

  const restaurant = dishes[0].restaurant;
  const rating = parseFloat(restaurant.rating);

  return (
    <>
      <Header />
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Thông tin nhà hàng */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-white shadow-md p-6 rounded-lg max-w-screen-md w-full">
            <div className="flex items-center gap-6">
              <img
                src={restaurant.image_url}
                alt={restaurant.name}
                className="w-64 h-40 object-cover rounded-lg"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{restaurant.name}</h1>
                <p className="text-gray-600 mt-2">{restaurant.address}</p>
                <div className="flex items-center mt-1">
                  <StarRating rating={rating} />
                  <span className="ml-2 text-gray-700 font-bold">
                    {rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Danh sách món ăn */}
        <h2 className="text-2xl font-bold mb-4 text-center">Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-screen-lg mx-auto">
          {dishes.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 flex items-center gap-4"
            >
              <img
                src={item.image_url}
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
    </>
  );
};

export default RestaurantDetail;
