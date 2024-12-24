import Http from "./http";

export const search = async (keyword, filters = {}) => {
    try {
        const response = await Http.get(`/dish/search`, {
            params: {
                keyword,
                ...filters,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error in search API:", error.message);
        throw error;
    }
};

