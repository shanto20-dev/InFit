import { createClothing, fetchAllClothing, fetchUserClothing, deleteClothing } from "../util/clothing_api_util";

export const RECEIVE_ALL_CLOTHING = "RECEIVE_ALL_CLOTHING";
export const RECEIVE_USER_CLOTHING = "RECEIVE_USER_CLOTHING";
export const RECEIVE_CLOTHING = "RECEIVE_CLOTHING";

export const receiveAllClothing = (clothings) => ({
  type: RECEIVE_ALL_CLOTHING,
  clothings,
});

export const receiveUserClothing = (clothings) => ({
  type: RECEIVE_USER_CLOTHING,
  clothings,
});

export const receiveClothing = (clothing) => ({
  type: RECEIVE_CLOTHING,
  clothing,
});

export const receiveClothing = (clothing) => ({
  type: RECEIVE_CLOTHING,
  clothing,
});

export const fetchTweets = () => (dispatch) =>
  getTweets()
    .then((tweets) => dispatch(receiveTweets(tweets)))
    .catch((err) => console.log(err));

export const fetchUserTweets = (id) => (dispatch) =>
  getUserTweets(id)
    .then((tweets) => dispatch(receiveUserTweets(tweets)))
    .catch((err) => console.log(err));

export const composeTweet = (data) => (dispatch) =>
  writeTweet(data)
    .then((tweet) => dispatch(receiveNewTweet(tweet)))
    .catch((err) => console.log(err));
