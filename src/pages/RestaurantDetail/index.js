import React, { useState, useEffect } from "react";
import Header from "../../shared/components/header";
import { restaurantDetail } from "../../services/restaurantDetail";
import { useParams } from "react-router-dom";


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
 

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        
        <div className="flex items-center space-x-6">
          <div className="flex-shrink-0 w-96 h-48 ">
            <img
              src={restaurant.image_url}
              alt="Restaurant Logo"
              className="rounded-lg"
            />
          </div>
          {/* Restaurant Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {restaurant.name}
            </h1>
            <div className="flex items-center gap-2 mb-2">
            <svg
            viewBox="0 0 1000 1000"
            fill="currentColor"
            height="1em"
            width="1em"
           
          >
            <path d="M426 50c13.333 0 20 6.667 20 20v860c0 13.333-6.667 20-20 20h-46c-13.333 0-20-6.667-20-20V490H184c-10.667 0-20-2-28-6-8-1.333-16.667-5.333-26-12L10 390c-6.667-4-10-9.333-10-16s3.333-12 10-16l120-82c9.333-6.667 18-10.667 26-12 5.333-2.667 14.667-4 28-4h176V70c0-13.333 6.667-20 20-20h46m564 208c6.667 4 10 9.333 10 16s-3.333 12-10 16l-118 82c-14.667 8-23.333 12-26 12-9.333 4-18.667 6-28 6H516l-40-230h342c12 0 21.333 1.333 28 4 6.667 2.667 15.333 6.667 26 12l118 82" />
          </svg>
            <p className="text-gray-600 ">
              {restaurant.address}
            </p>
            </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, starIndex) => {
                const rating = restaurant.rating;
                const isFull = starIndex < Math.floor(rating);
                const isHalf = starIndex < rating && starIndex >= Math.floor(rating);
                return (
                  <div key={starIndex} className="relative inline-block h-4 w-4">
                    <svg
                    className="absolute top-0 left-0 h-4 w-4 text-gray-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    >
                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                    </svg>
                    <svg
                    className={`absolute top-0 left-0 h-4 w-4 ${
                    isFull || isHalf ? "text-yellow-400" : "text-transparent"
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    style={isHalf ? { clipPath: "inset(0 50% 0 0)" } : {}}
                    >
                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                    </svg>
                  </div>
                )
              })}
              
            </div>
            <p className="text-sm font-medium text-gray-900">{restaurant.rating}</p>
          </div>
          </div>
        </div>



        {/* Menu Items */}
        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Món chính</h2>
          <ul className="space-y-4">
            {dishes.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow"
              >
                  <div className="flex-shrink-0 w-48 h-24 ">
                  <img
                    src={item.image_url}
                    alt="Dish Logo"
                    className="rounded-lg"
                  />
                </div>
                <span className="text-gray-800 font-medium">{item.name}</span>
                <span className="text-blue-600 font-semibold">{item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default RestaurantDetail;
