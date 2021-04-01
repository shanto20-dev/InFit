import axios from "axios";

export const createOutfit = (outfitData) => {
  return axios.post("/api/outfit/new", outfitData);
};

export const fetchAllOutfits = () => {
  return axios.get("/api/oufit");
};

export const fetchUserOutfits = (id) => {
  return axios.get(`/api/outfit/user/${id}`);
};

export const fetchOutfit = (id) => {
  return axios.get(`/api/outfit/${id}`);
};

export const deleteOutfit = (id, userId) => {
  return axios({
    method: 'DELETE',
    url:`/api/outfit/${id}`,
    data: { userId: userId }
  })
};

export const addClothes = (outfitData) => {
  return axios.patch(`/api/outfit/${outfitData.id}`, outfitData);
};