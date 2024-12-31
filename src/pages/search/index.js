import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../shared/components/header";
import { search } from "../../services/search";
const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const keyword = searchParams.get("keyword");
  const [results, setResult] = useState([]);
  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const response = await search(keyword);
        setResult(response.data);
        
  
      } catch (error) {
        console.error("Error fetching search results:", error.message);
      }
    };
    fetchSearch();
  }, [keyword])

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
            Đã tìm thấy {results.length} món ăn phù hợp
          </p>
        </div>
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {results.map((item) => (
              <div 
                key={item.dish_id}
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/dish-detail/${item.dish_id}`)}
              >
                <div className="flex h-48 md:h-56">
                  {/* Dish Image */}
                  <div className="w-2/5 relative">
                    <img
                      src={item.image_url || "https://mediawinwin.vn/upload/images/sanpham/bao-gia-chup-mon-an-dich-vu-chup-anh-do-an-chuyen-nghiep-5.JPG"}
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
        ):(
          
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