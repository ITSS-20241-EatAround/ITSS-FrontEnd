import React, { useState, useEffect } from "react";
import Header from "../../shared/components/header";
// import { restaurantDetail } from "../../services/restaurantDetail";
import { useNavigate, useParams } from "react-router-dom";
// import { getTokenFromLocalStorage } from "../../services/localtoken";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`star-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#cbd5e0" />
            </linearGradient>
          </defs>
          <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
    </div>
  );
};

const RestaurantDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data
  const restaurantData = {
    name: "The Good Eggs Cafe",
    rating: 4.5,
    reviews: 5000,
    image: "/restaurant1.jpg",
    description: "Breakfast & Brunch • $$ • Open 8:30 AM",
    menu: [
      {
        name: "Bacon, Egg, and Cheese Sandwich",
        price: 12.99,
        image: "/ramen.jpg"
      },
      {
        name: "Pancakes",
        price: 11.99,
        image: "/ramen.jpg"
      },
      {
        name: "Avocado Toast",
        price: 13.99,
        image: "/ramen.jpg"
      },
    ]
  };

  // Mock data for menu items
  const menuItems = [
    {
      name: "Bún riêu cua đặc biệt",
      price: 45000,
      description: "Bún riêu cua truyền thống",
      image: "/bunrieu.jpg"
    },
    {
      name: "Bún riêu tôm",
      price: 42000,
      description: "Bún riêu với tôm tươi và rau thơm",
      image: "/bunrieu.jpg"
    },
    {
      name: "Bún riêu ốc",
      price: 48000,
      description: "Bún riêu kết hợp với ốc tươi",
      image: "/bunrieu.jpg"
    },
    {
      name: "Bún riêu sườn",
      price: 50000,
      description: "Bún riêu với sườn non",
      image: "/bunrieu.jpg"
    },
    {
      name: "Bún riêu chả",
      price: 40000,
      description: "Bún riêu với chả cua đặc biệt",
      image: "/bunrieu.jpg"
    },
    {
      name: "Bún riêu thập cẩm",
      price: 55000,
      description: "Bún riêu với đầy đủ topping",
      image: "/bunrieu.jpg"
    },
    {
      name: "Bún riêu cua cà chua",
      price: 43000,
      description: "Bún riêu chua thanh với cà chua",
      image: "/bunrieu.jpg"
    },
    {
      name: "Bún riêu nấm",
      price: 38000,
      description: "Bún riêu chay với nấm",
      image: "/bunrieu.jpg"
    },
    {
      name: "Bún riêu cua đồng",
      price: 52000,
      description: "Bún riêu với cua đồng tự nhiên",
      image: "/bunrieu.jpg"
    }
  ];

  /* Commented API calls
  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (!token) {
      navigate('/login');
    }
    const fetchData = async () => {
      try {
        const data = await restaurantDetail(id);
        setRestaurantData(data);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, [id]);
  */

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7)), url('/backgr2.jpg')`
      }}
    >
      <Header />
      
      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Restaurant Info Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden mb-8">
          <div className="h-[300px] relative">
            <img 
              src={restaurantData.image}
              alt={restaurantData.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {restaurantData.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={restaurantData.rating} />
              <span className="text-gray-600">
                {restaurantData.rating} ({restaurantData.reviews.toLocaleString()} reviews)
              </span>
            </div>
            <p className="text-gray-600">{restaurantData.description}</p>
          </div>
        </div>

        {/* Best Sellers Section - Limited to 3 items */}
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Sellers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {restaurantData.menu.slice(0, 3).map((item, index) => (
                <div 
                  key={index}
                  className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-48">
                    <img 
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white font-semibold text-lg mb-1">{item.name}</h3>
                      <p className="text-white font-medium">${item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Menu Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Menu</h2>
            
           {/* Search Bar */}
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Tìm kiếm món ăn..."
                className="w-full px-4 py-3 rounded-full border border-black focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>


            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {menuItems.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-black"
                >
                  <div className="relative h-48">
                    <img 
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"/>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-gray-800 font-bold">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-orange-500 font-bold">
                        {item.price.toLocaleString()}đ
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
