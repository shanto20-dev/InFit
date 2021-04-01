import axios from "axios";

export const searchClothingByName = (searchTerm) => {
  return axios({
    method: "GET",
    url: `/api/clothing/search?searchTerm=${searchTerm}`,
  });
};
