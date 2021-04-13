import axios from "axios";

export const searchClothingByName = (searchTerm) => {
    return axios({
        method: "GET",
        url: `/api/search?searchTerm=${searchTerm}`,
    });
};

export const searchOutfitByClothes = (clothingId) => {
    return axios({
        method: "GET",
        url: `/api/search/clothing?clothingId=${clothingId}`,
    });
};
