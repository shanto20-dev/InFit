import { createClothing, fetchAllClothing, fetchUserClothing, deleteClothing } from "../util/clothing_api_util";

export const RECEIVE_ALL_CLOTHING = "RECEIVE_ALL_CLOTHING";
export const RECEIVE_USER_CLOTHING = "RECEIVE_USER_CLOTHING";
export const RECEIVE_CLOTHING = "RECEIVE_CLOTHING";
export const REMOVE_CLOTHING = "REMOVE_CLOTHING";

const receiveAllClothing = (clothings) => ({
  type: RECEIVE_ALL_CLOTHING,
  clothings,
});

const receiveUserClothing = (clothings) => ({
  type: RECEIVE_USER_CLOTHING,
  clothings,
});

const receiveClothing = (clothing) => ({
  type: RECEIVE_CLOTHING,
  clothing,
});

const removeClothing = (clothingId) => ({
  type: REMOVE_CLOTHING,
  clothingId,
});

export const getAllClothing = () => (dispatch) =>
  fetchAllClothing()
    .then((clothings) => dispatch(receiveAllClothing(clothings)), (err) => console.log(err))

export const getUserClothing = (id) => (dispatch) =>
  fetchUserClothing(id)
    .then((clothings) => dispatch(receiveUserClothing(clothings)), (err) => console.log(err));

export const newClothing = (clothingData) => (dispatch) =>
  createClothing(clothingData)
    .then((clothing) => dispatch(receiveClothing(clothing)), (err) => console.log(err));

    export const newClothing = (clothingData) => (dispatch) =>
  createClothing(clothingData)
    .then((clothing) => dispatch(receiveClothing(clothing)), (err) => console.log(err));

export const deleteClothing = (clothingId) => (dispatch) =>
  deleteClothing(clothingId)
    .then(() => dispatch(removeClothing(clothingId)), (err) => console.log(err));

    