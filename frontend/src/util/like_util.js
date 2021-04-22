import axios from "axios";

export const toggleLike = (itemId, type, user, liked) => {
    return axios.post("/api/like", {
        itemId: itemId,
        type: type,
        user: user,
        liked: liked,
    });
};

export const fetchLikes = (id) => {
    return axios.get(`/api/like/${id}`);
};
