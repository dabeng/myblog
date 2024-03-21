import axios from "axios";

const API_URL = "http://localhost:3001/users/";

const getUser = (userId) => {
  return axios.get(API_URL + userId)
  .then((response) => {
    return response.data;
  });
};

const updateUser = (data) => {
  return axios.patch(API_URL + data._id, data)
  .then((response) => {
    return response.data;
  });
};

const UserService = {
  getUser,
  updateUser,
};

export default UserService;