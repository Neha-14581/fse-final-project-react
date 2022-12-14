/**
 * @file Implement api services for operations related to bookmark
 */
 import axios from "axios";

 const BASE_URL = process.env.REACT_APP_BASE_URL;
 const TOPICS_API = `${BASE_URL}/api/topics`;

 const api = axios.create({
    withCredentials: true
  });

/**
 * Retrieves all users bookmark the user from the backend.
 * @param tid tuit id
 * @returns a list of users
 */
export const findAllTuitsByTopic = (tid) =>
api.get(`${TOPICS_API}/${tid}/tuits`)
    .then(response => response.data);

