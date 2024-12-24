import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurantDetail } from '../../services/restaurantDetail';

const List = ({ id }) => {
    const [menuItems, setMenuItems] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMenu, setFilteredMenu] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDish = async () => {
          try {
            const data = await restaurantDetail(id);
            setMenuItems(data.data);
            setFilteredMenu(data.data);
          } catch (error) {
            throw error.message;
          }
        }
        fetchDish();
      }, [id]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = menuItems.filter((item) =>
            item.name.toLowerCase().includes(value)
        );
        setFilteredMenu(filtered);
    };

    const handleItemClick = (id) => {
        navigate(`/dish-detail/${id}`);
        window.scrollTo(0, 0);
    };

    return (
        <div className="mt-8 max-w-screen-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Menu</h2>
            <input
                type="text"
                placeholder="Tìm kiếm món ăn..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            {/* Bao bên ngoài danh sách */}
            <div className="space-y-6">
                {filteredMenu.map((item) => (
                    item &&
                    <div
                        key={item.id}
                        onClick={() => handleItemClick(item.dish_id)}
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 flex items-center gap-4 cursor-pointer"
                    >
                        <img
                            src={item.image_url || "https://beptueu.vn/hinhanh/tintuc/top-15-hinh-anh-mon-an-ngon-viet-nam-khien-ban-khong-the-roi-mat-1.jpg"}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                            <h3 className="text-lg font-bold">{item.name}</h3>
                            <p className="text-gray-600 text-sm mt-1">
                                {item.description}
                            </p>
                            <p className="text-red-500 font-bold mt-2">
                                {(+item.price).toFixed(0)} Đ
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;
