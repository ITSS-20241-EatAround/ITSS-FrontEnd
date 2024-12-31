import Http from "./http";
export const restaurantDetail = async (id) => {
    try {
        const response = await Http.get(`/dish/restaurant/${id}`);
        console.log("API Response:", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const restaurantGetById = async (id, latitude, longitude) => {
    try {
        const response = await Http.get(`/restaurant/get-by-id/${id}`, {
            params: {latitude, longitude}
        });
        console.log("API Response:", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getDishById = (id, config) => Http.get(`/dish/get-by-id/${id}`, config);