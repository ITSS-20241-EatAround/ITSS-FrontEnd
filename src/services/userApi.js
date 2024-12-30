import Http from "./http";

export const GetFavoriteAPI = (id, config) => Http.get(`/user/favorite/get-by-dish-id/${id}`, config);

export const PostFavoriteAPI = (id, config) => Http.post(`/user/favorite/${id}`, config);

export const DeleteFavoriteAPI = (id, config) => Http.delete(`/user/favorite/${id}`, config);

export const GetCommentAPI = (id, config) => Http.get(`/user/comment/${id}`, config);

export const PostCommentAPI = (config) => Http.post(`/user/comment`, config);

export const UserFavoriteFoodAPI = (config) => Http.get(`/user/favorite/user-dish`, config);
