import axios from "axios";

const API_URL = "http://localhost:3001/auth/";

const signup = (data) => {
  data.roles = ['user'];
  return axios.post(API_URL + 'signup', data);
};

const login = (username, password) => {
  return axios
    .post(API_URL + 'signin', {
      username,
      password,
    })
    .then((response) => {
      return response.data;
    });
};

const logout = () => {
  return axios.get(API_URL + 'logout');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;