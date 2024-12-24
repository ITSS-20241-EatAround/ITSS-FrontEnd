import React, { useState , useEffect} from "react";
import Header from "../../shared/components/header";
import List from "../../shared/components/list"
import {restaurantDetail} from "../../services/restaurantDetail";
import { useParams } from "react-router-dom";
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating); // Số sao đầy đủ
  const halfStar = rating - fullStars >= 0.5; // Có nửa sao không?
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Số sao rỗng

  return (
    <div className="flex items-center">
      {/* Sao đầy đủ */}
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-500 text-lg">
            ★
          </span>
        ))}
      {/* Nửa sao */}
      {halfStar && (
        <span className="text-yellow-500 text-lg">☆</span>
      )}
      {/* Sao rỗng */}
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
        setDishes(data.data)
        console.log(dishes)
      } catch (error) {
        throw error.message;
      }
    }
    fetchDish();
  }, [id])
  if (!dishes.length) return <div>No dishes found.</div>;

  // Lấy thông tin nhà hàng từ món ăn đầu tiên
  const restaurant = dishes[0].restaurant;
  const rating = parseFloat(restaurant.rating);
  console.log(rating)
  return (
    <>
      <Header />
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Thông tin nhà hàng */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-white shadow-md p-6 rounded-lg max-w-screen-md w-full relative">
            <div className="flex items-center gap-6">
              <img
                src={restaurant.image_url || "https://posapp.vn/wp-content/uploads/2020/09/%C4%91%E1%BB%93ng-b%E1%BB%99-n%E1%BB%99i-th%E1%BA%A5t.jpg"}
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
        <List id={id}/>
      </div>
    </>
  );
};

export default RestaurantDetail;
