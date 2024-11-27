import Http from "./http";

export const RestaurantSuggest = (config) => Http.get("/suggest/restaurant", config);

export const DishSuggest = (config) => Http.get("/suggest/dish", config);