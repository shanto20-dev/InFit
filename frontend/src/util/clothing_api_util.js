import axios from "axios";

export const createClothing = (clothingData) => {
  return axios.post("/api/clothing/new", clothingData);
};

export const patchClothing = (clothingData) => {
  return axios.patch("/api/clothing/edit", clothingData);
};

export const fetchAllClothing = () => {
  return axios.get("/api/clothing");
};

export const fetchUserClothing = (id) => {
  return axios.get(`/api/clothing/user/${id}`);
};

export const fetchClothing = (id) => {
  return axios.get(`/api/clothing/${id}`);
};

export const deleteClothing = (id, userId) => {
  return axios({
    method: 'DELETE',
    url:`/api/clothing/${id}`,
    data: { userId: userId }
  })
};
