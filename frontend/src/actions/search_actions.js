import {
    searchClothingByName,
    searchOutfitByClothes,
} from "../util/search_api_util";

export const RECEIVE_SEARCHED_CLOTHING = "RECEIVE_SEARCHED_CLOTHING";

const receiveSearchedClothing = (clothing) => {
    return {
        type: RECEIVE_SEARCHED_CLOTHING,
        clothing,
    };
};

export const searchClothesByName = (searchTerm) => (dispatch) => {
    return searchClothingByName(searchTerm)
        .then((clothing) => dispatch(receiveSearchedClothing(clothing.data)))
        .catch((clothing) => console.log(clothing));
};

export const searchOutfitByClothing = (clothingId) => (dispatch) => {
    return searchOutfitByClothes(clothingId)
        .then((outfits) => dispatch(receiveSearchedClothing(outfits.data)))
        .catch((clothing) => console.log(clothing));
};
