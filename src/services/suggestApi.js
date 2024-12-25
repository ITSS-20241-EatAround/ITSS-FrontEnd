import Http from "./http";

export const RestaurantSuggest = async (latitude, longitude) => {
    try {
        const response = await Http.get("/suggest/restaurant", {
            params: {latitude, longitude}
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const DishSuggest = (config) => Http.get("/suggest/dish", config);