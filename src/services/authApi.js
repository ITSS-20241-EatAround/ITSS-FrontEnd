import Http from "./http";

export const LoginAPI = (config) => Http.post("/auth/login", config);

export const RegisterAPI = (config) => Http.post("/auth/register", config);

export const ForgetAPI = (config) => Http.post("/auth/forget", config);

export const ChangeAPI = async (currentPassword, newPassword, token) => {
    try {
        const response = await Http.post('/auth/change', 
            { currentPassword, newPassword }, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
