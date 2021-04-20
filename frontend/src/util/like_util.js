import axios from "axios";

export const toggleLike = (itemId) => {
    return axios.post("/api/like", { itemId: itemId });
};
