import axios from "axios";

const API_URL = "http://localhost:3001/votes/";

const createVote = (data: any) => {
  return axios.post(API_URL, data)
    .then((response) => {
      return response.data;
    });
};

const getVotes = (querystring: string = '') => {
  return axios.get(API_URL + querystring)
    .then((response) => {
      return response.data;
    });
};

const getOneCommentById = (id: string) => {
  return axios.get(API_URL + id)
    .then((response) => {
      return response.data;
    });
};

const updateVote = (data) => {
  return axios.patch(API_URL + data._id, data)
    .then((response) => {
      return response.data;
    });
};

const VoteService = {
  createVote,
  getVotes,
  getOneCommentById,
  updateVote,
};

export default VoteService;