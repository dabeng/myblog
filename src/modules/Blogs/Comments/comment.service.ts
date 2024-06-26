import axios from "axios";

const API_URL = "http://localhost:3001/comments/";

const createComment = (data: any) => {
  return axios.post(API_URL, data)
    .then((response) => {
      return response.data;
    });
};

const getComments = (querystring: string = '') => {
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

const updateComment = (data) => {
  return axios.patch(API_URL + data._id, data)
    .then((response) => {
      return response.data;
    });
};

const CommentService = {
  createComment,
  getComments,
  getOneCommentById,
  updateComment,
};

export default CommentService;