import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../shared/components/header';
import { UserFavoriteFoodAPI } from '../../services/userApi';
import { useEffect} from 'react';
import { DeleteFavoriteAPI } from '../../services/userApi';
import { pipe } from '../../shared/utils/pipe';
const FavoritePage = () => {
    const navigate = useNavigate();
    const [favoriteDishes, setFavoriteDishes] = useState([]);
    const [id, setId] = useState('');
    const [err, setErr] = useState(null);
    const removeFavorite = (id) => {

            DeleteFavoriteAPI(id, {}).then(() => {
                setFavoriteDishes((prevDishes) =>
                    prevDishes.filter((dish) => dish.dish_id !== id)
                );
                }).catch((error) => {
                    console.log(error);
                });
            
        };
    useEffect(()=>{
        const fetchUserFavor = async () => {
            try {
                const userFavor = await UserFavoriteFoodAPI();
                console.log(userFavor.data.data);
                if (Array.isArray(userFavor.data.data)) {
                    setFavoriteDishes(userFavor.data.data);
                } else {
                    console.error("API không trả về mảng:", userFavor);
                    setFavoriteDishes([]);
                }
            } catch (error) {
                setErr(error);
            }
        }
        fetchUserFavor()
    }, [])

    return (
        <div 
            className="min-h-screen bg-cover bg-center bg-fixed"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7)), url('/backgr2.jpg')`
            }}
        >
            <Header />
            
            <div className="max-w-7xl mx-auto px-4 py-12">
                
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Your Favorite Dishes
                    </h1>
                    <p className="text-gray-600">
                        Discover and revisit your most loved dishes
                    </p>
                </div>
                {favoriteDishes.length === 0?  (
                    <div>
                        <p className='text-2xl text-gray-800 text-bold'>Danh sách trống</p>
                    </div>
                ) : (
                                    
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favoriteDishes.map((dish) => (
                    <div 
                        key={dish.dish_id}
                        className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        {/* Image Container */}
                        <div className="relative h-48">
                            <img 
                                src={dish?.dish?.image_url}
                                alt={dish?.dish?.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            
                            {/* Restaurant Badge */}
                            <div className="absolute top-4 left-4 flex items-center bg-white/90 backdrop-blur-sm rounded-full p-2">
                                <img 
                                    src={dish?.dish?.restaurant?.image_url}
                                    alt={dish?.dish?.restaurant?.name}
                                    className="w-6 h-6 rounded-full object-cover"
                                />
                                <span className="ml-2 text-sm font-medium text-gray-900">
                                    {dish?.dish?.restaurant?.name}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {dish?.dish?.name}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">
                                            {dish?.dish?.description}
                                        </span>
                                    </div>
                                </div>
                                <span className="text-lg font-bold text-orange-500">
                                    {pipe(dish.dish.price)}đ
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between">
                                <button 
                                    onClick={() => navigate(`/dish-detail/${dish.dish_id}`)}
                                    className="text-orange-500 hover:text-orange-600 font-medium"
                                >
                                    Xem chi tiết →
                                </button>
                                <button 
                                    className="text-red-500 hover:text-red-600"
                                    onClick={() => removeFavorite(dish?.dish_id)}
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
                )}

            </div>
        </div>
    );
};

export default FavoritePage; 