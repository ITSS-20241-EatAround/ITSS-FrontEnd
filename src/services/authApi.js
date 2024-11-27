import Http from "./http";

export const LoginAPI = (config) => Http.post("/auth/login", config);

export const RegisterAPI = (config) => Http.post("/auth/register", config);

export const ForgetAPI = (config) => Http.post("/auth/forget", config);

export const ChangeAPI = (config) => Http.post("/auth/change", config);
