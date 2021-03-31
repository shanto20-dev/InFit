import {
  createClothing,
  fetchAllClothing,
  fetchUserClothing,
  fetchClothing,
  deleteClothing,
  patchClothing,
} from "../util/clothing_api_util";

export const RECEIVE_ALL_CLOTHING = "RECEIVE_ALL_CLOTHING";
export const RECEIVE_USER_CLOTHING = "RECEIVE_USER_CLOTHING";
export const RECEIVE_CLOTHING = "RECEIVE_CLOTHING";
export const REMOVE_CLOTHING = "REMOVE_CLOTHING";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

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

export const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

export const getAllClothing = () => (dispatch) =>
  fetchAllClothing().then(
    (clothings) => dispatch(receiveAllClothing(clothings.data)),
    (err) => console.log(err)
  );

export const getUserClothing = (id) => (dispatch) =>
  fetchUserClothing(id).then(
    (clothings) => dispatch(receiveUserClothing(clothings)),
    (err) => console.log(err)
  );

export const newClothing = (clothingData) => (dispatch) => {
  return createClothing(clothingData)
    .then((clothing) => dispatch(receiveClothing(clothing)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const editClothing = (clothingData) => (dispatch) => {
  return patchClothing(clothingData)
    .then((clothing) => dispatch(receiveClothing(clothing)))
    .catch((err) => console.log(err));
};

export const destroyClothing = (clothingId) => (dispatch) =>
  deleteClothing(clothingId).then(
    () => dispatch(removeClothing(clothingId)),
    (err) => dispatch(receiveErrors(err.response.data))
  );

export const getClothing = (clothingId) => (dispatch) =>
  fetchClothing(clothingId).then(
    (clothing) => dispatch(receiveClothing(clothing.data)),
    (err) => console.log(err)
  );
