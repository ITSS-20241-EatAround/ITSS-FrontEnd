import Http from "./http";

export const getRestaurants = async (latitude, longitude) => {
    try {
        const response = await Http.get('/restaurant/get-all', {
            params: {latitude, longitude}
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}