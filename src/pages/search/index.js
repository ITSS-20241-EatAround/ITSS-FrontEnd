import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {search} from "../../services/search";
import Header from "../../shared/components/header";
const Search = () => {
    const {keyword} = useParams();
    const[results, setResult] = useState([]);
    
    useEffect(() => {
        const fetchSearch = async () => {
            try {
                const response = await search(keyword);
                setResult(response.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        if(keyword){
            fetchSearch();
        }
    }, [keyword])
    return(
        <>
        <Header/>
        <div className="container mx-auto p-4">
        
        <h1 className="text-2xl font-bold mb-4">Search Results for "{keyword}"</h1>
        {results.length > 0 ? (
          <ul className="space-y-4">
            {results.map((item) => (
              <li key={item.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow">
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
        ) : (
          <p>No results found.</p>
        )}
      </div>
      </>
    )
}
export default Search;