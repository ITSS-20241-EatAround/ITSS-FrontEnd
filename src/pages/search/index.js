import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../shared/components/header";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const keyword = searchParams.get("keyword");

  // Mock data for search results
  const mockResults = [
    {
      id: 1,
      name: "Spicy Ramen",
      description: "Mì Ramen cay với thịt heo chashu và trứng hột gà",
      price: 89000,
      image_url: "/ramen.jpg",
      rating: 4.8,
      reviews: 1250,
      restaurant: {
        name: "Ramen House Tokyo",
        address: "123 Lê Lợi, Quận 1, TP.HCM",
        rating: 4.5,
        image: "/restaurant1.jpg"
      }
    },
    {
      id: 2,
      name: "Phở Bò Đặc Biệt",
      description: "Phở bò với các loại thịt bò tươi ngon và nước dùng đậm đà",
      price: 75000,
      image_url: "/pho1.jpg",
      rating: 4.6,
      reviews: 980,
      restaurant: {
        name: "Phở Hà Nội",
        address: "45 Nguyễn Huệ, Quận 1, TP.HCM",
        rating: 4.7,
        image: "/restaurant2.jpg"
      }
    },
    // ... thêm mock data khác
  ];

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7)), url('/backgr2.jpg')`
      }}
    >
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Kết quả tìm kiếm cho "{keyword}"
          </h1>
          <p className="text-gray-600">
            Đã tìm thấy {mockResults.length} món ăn phù hợp
          </p>
        </div>

        {/* Search Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockResults.map((item) => (
            <div 
              key={item.id}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/dish-detail/${item.id}`)}
            >
              <div className="flex h-48 md:h-56">
                {/* Dish Image */}
                <div className="w-2/5 relative">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-orange-500 font-semibold">
                      {item.price.toLocaleString()}đ
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {item.name}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(item.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({item.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Restaurant Info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={item.restaurant.image}
                      alt={item.restaurant.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {item.restaurant.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {item.restaurant.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results State */}
        {mockResults.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              Không tìm thấy kết quả nào phù hợp với từ khóa "{keyword}"
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;