import {
  createOutfit,
  fetchAllOutfits,
  fetchUserOutfits,
  fetchOutfit,
  deleteOutfit,
} from "../util/outfit_api_util";

export const RECEIVE_ALL_OUTFITS = "RECEIVE_ALL_OUTFITS";
export const RECEIVE_USER_OUTFITS = "RECEIVE_USER_OUTFITS";
export const RECEIVE_OUTFIT = "RECEIVE_OUTFIT";
export const REMOVE_OUTFIT = "REMOVE_OUTFIT";

const receiveAllOutfits = (outfits) => ({
  type: RECEIVE_ALL_OUTFITS,
  outfits,
});

const receiveUserOutfits = (outfits) => ({
  type: RECEIVE_USER_OUTFITS,
  outfits,
});

const receiveOutfit = (outfit) => ({
  type: RECEIVE_OUTFIT,
  outfit,
});

const removeOutfit = (outfitId) => ({
  type: REMOVE_OUTFIT,
  outfitId,
});

export const getAllOutfits = () => (dispatch) =>
  fetchAllOutfits().then(
    (outfits) => dispatch(receiveAllOutfits(outfits.data)),
    (err) => console.log(err)
  );

export const getUserOutfits = (id) => (dispatch) =>
  fetchUserOutfits(id).then(
    (outfits) => dispatch(receiveUserOutfits(outfits)),
    (err) => console.log(err)
  );

export const newOutfit = (outfitData) => (dispatch) => {
  return createOutfit(outfitData)
    .then((outfit) => dispatch(receiveOutfit(outfit)))
    .catch((err) => console.log(err));
};

// export const editClothing = (clothingData) => (dispatch) => {
//   return editClothing(clothingData)
//     .then((clothing) => dispatch(receiveClothing(clothing)))
//     .catch((err) => console.log(err));
// };

export const destroyOutfit = (outfitId) => (dispatch) =>
  deleteOutfit(outfitId).then(
    () => dispatch(removeOutfit(outfitId)),
    (err) => console.log(err)
  );

export const getOutfit = (outfitId) => (dispatch) =>
  fetchOutfit(outfitId).then(
    (outfit) => dispatch(receiveOutfit(outfit.data)),
    (err) => console.log(err)
  );
