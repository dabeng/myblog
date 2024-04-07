import axios from "axios";

const API_URL = "http://localhost:3001/blogs/";

const getBlogs = (querystring: string = '') => {
  return axios.get(API_URL + querystring)
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
  updateBlog,
};

export default BlogService;