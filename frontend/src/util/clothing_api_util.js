import axios from "axios";

export const createClothing = (clothingData) => {
  return axios.post("/api/clothing/new", clothingData);
};

export const fetchAllClothing = () => {
  return axios.get("/api/clothing/");
};

export const fetchUserClothing = (id) => {
  return axios.get(`/api/clothing/user/${id}`);
};

export const fetchClothing = (id) => {
  return axios.get(`/api/clothing/${id}`);
};

export const deleteClothing = (id) => {
  return axios.delete(`/api/clothing/${id}`);
};
