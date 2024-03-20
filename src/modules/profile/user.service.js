import axios from "axios";

const API_URL = "http://localhost:3001/users/";

const updateUser = (data) => {
  return axios.patch(API_URL + data.id, data)
  .then((response) => {
    return response.data;
  });
};

const UserService = {
  updateUser,
};

export default UserService;