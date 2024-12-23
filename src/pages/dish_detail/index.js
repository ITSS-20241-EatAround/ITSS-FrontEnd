import React, { useState, useEffect } from "react";
import Header from "../../shared/components/header";
import List from "../../shared/components/list";
import Comment from "../../shared/components/comment";
import { useNavigate, useParams } from "react-router-dom";
import { getDishById } from "../../services/restaurantDetail";
import { DeleteFavoriteAPI, GetFavoriteAPI, PostFavoriteAPI } from "../../services/userApi";

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex items-center">
            {Array(fullStars)
                .fill()
                .map((_, i) => (
                    <span key={`full-${i}`} className="text-yellow-500 text-lg">★</span>
                ))}
            {halfStar && <span className="text-yellow-500 text-lg">☆</span>}
            {Array(emptyStars)
                .fill()
                .map((_, i) => (
                    <span key={`empty-${i}`} className="text-gray-300 text-lg">★</span>
                ))}
        </div>
    );
};

const DishDetail = () => {
    const { id } = useParams();
    const [dish, setDish] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        if (!isFavorite) {
            PostFavoriteAPI(id, {}).then((data) => {
                setIsFavorite((prev) => !prev);
            }).catch((error) => {
                console.log(error);
            });
        } else {
            DeleteFavoriteAPI(id, {}).then((data) => {
                setIsFavorite((prev) => !prev);
            }).catch((error) => {
                console.log(error);
            });
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        getDishById(id, {}).then(({ data }) => {
            setDish(data.data);
        }).catch((err) => {
            console.log(err);
        });

        GetFavoriteAPI(id, {}).then(({ data }) => {
            setIsFavorite(true);
        }).catch((err) => {
            setIsFavorite(false);
        });
    }, [id]);
    return (
        <>
            <Header />
            <div className="p-6 bg-gray-50 min-h-screen">
                {
                    dish &&
                    <>
                        <div className="flex flex-col items-center justify-center mb-8">
                            <div className="bg-white shadow-md p-6 rounded-lg max-w-screen-md w-full relative">
                                <img
                                    src={dish.image_url}
                                    alt="dish image"
                                    className="w-full h-60 object-cover rounded-lg mb-4"
                                />
                                <div className="flex items-center justify-between">
                                    <h1 className="text-2xl font-bold text-gray-800">
                                        {dish.name}
                                    </h1>
                                    <button
                                        onClick={toggleFavorite}
                                        className={`text-6xl ${isFavorite ? "text-red-500" : "text-gray-300"} transform transition-all duration-300 hover:scale-125`}
                                    >
                                        ♥
                                    </button>

                                </div>
                                <p className="text-gray-600 mt-2">{dish.description}</p>
                                <p className="text-red-500 font-bold mt-2">
                                    {(+dish.price).toFixed(0)} Đ
                                </p>
                            </div>

                            <div className="bg-white shadow-md p-6 rounded-lg max-w-screen-md w-full mt-6 cursor-pointer" onClick={() => navigate(`/restaurant-detail/${dish.restaurant_id}`)}>
                                <div className="flex items-center gap-6">
                                    <img
                                        src={dish.restaurant.image_url}
                                        alt="Restarunt image"
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-800">
                                            {dish.restaurant.name}
                                        </h1>
                                        <p className="text-gray-600 mt-2">{dish.restaurant.address}</p>
                                        <div className="flex items-center mt-1">
                                            <StarRating rating={dish.restaurant.rating} />
                                            <span className="ml-2 text-gray-700 font-bold">
                                                {(+dish.restaurant.rating).toFixed(1)}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 mt-1">
                                            Liên hệ: {dish.restaurant.contat || 'Không có thông tin'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Comment id={id}/>

                        <List id={dish.restaurant_id} />
                    </>
                }

            </div>
        </>
    );
};

export default DishDetail;

