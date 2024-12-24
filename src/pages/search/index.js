import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { search } from "../../services/search";
import Header from "../../shared/components/header";
const Search = () => {
  const [results, setResult] = useState([]);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const keyword = searchParams.get("keyword");
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const filters = {
          latitude: latitude || null,
          longitude: longitude || null,
          minPrice: searchParams.get("minPrice") || null,
          maxPrice: searchParams.get("maxPrice") || null,
          distance: searchParams.get("distance") || null,
          rating: searchParams.get("rating") || null,
          page: currentPage,
          limit: 10,
        };
        const response = await search(keyword, filters);
        setResult(response.data);
        setTotalPage(response.totalPages || 1);
      } catch (error) {
        console.error("Error fetching search results:", error.message);
      }
    };

  
      fetchSearch();
   
  }, [keyword, latitude, longitude, searchParams, currentPage]);
  const handleChangePage = (newPage) => {
    if(newPage >= 1 && newPage <= totalPage){
      setCurrentPage(newPage);
    }
  }
  return (
    <>
      <Header />
      <div className="container mx-auto p-4">

        <h1 className="text-2xl font-bold mb-4">Search Results for "{keyword}"</h1>
        {results.length > 0 ? (
          <>
          <ul className="space-y-4">
            {results.map((item) => (
              <li key={item.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow" onClick={() => navigate(`/dish-detail/${item.dish_id}`)}>
                <div className="flex-shrink-0 w-38 h-24">
                  <img
                    src={item.image_url || "https://beptueu.vn/hinhanh/tintuc/top-15-hinh-anh-mon-an-ngon-viet-nam-khien-ban-khong-the-roi-mat-1.jpg"}
                    alt={item.name}
                    className="rounded-lg w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 ml-4">
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p className="text-gray-600">Description: {item.description}</p>
                  <p className="text-gray-600">Price: {Number(item.price)} VNĐ</p>
                  <p className="text-gray-600">Category: {Number(item.category)}</p>
                  <p className="text-gray-600">Restaurant: {item.restaurant.name}</p>
                  <p className="text-gray-600">Address: {item.restaurant.address}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-6 space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => handleChangePage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <svg viewBox="0 0 48 48" fill="currentColor" width="24px" height="24px"><path d="M30.83 14.83L28 12 16 24l12 12 2.83-2.83L21.66 24z"></path></svg>
              </button>
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => handleChangePage(currentPage + 1)}
                disabled={currentPage === totalPage}
              >
                <svg viewBox="0 0 48 48" fill="currentColor" width="24px" height="24px"><path d="M20 12l-2.83 2.83L26.34 24l-9.17 9.17L20 36l12-12z"></path></svg>
              </button>
            </div>
          </>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </>
  )
}
export default Search;