import axios from "axios";

const API_URL = "http://localhost:3001/blogs/";

const getBlogs = (querystring: string = '') => {
  return axios.get(API_URL + querystring)
    .then((response) => {
      return response.data;
    });
};

const getOneBlogById = (id: string) => {
  return axios.get(API_URL + id)
    .then((response) => {
      return response.data;
    });
};

const updateBlog = (data) => {
  return axios.patch(API_URL + data._id, data)
    .then((response) => {
      return response.data;
    });
};

const BlogService = {
  getBlogs,
  getOneBlogById,
  updateBlog,
};

export default BlogService;