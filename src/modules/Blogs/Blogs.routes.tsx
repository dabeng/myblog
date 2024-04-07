import BlogList from '../../pages/blogs/BlogList';
import SingleBlog from '../../pages/blogs/SingleBlog';
import CreateBlog from '../../pages/blogs/CreateBlog';
import EditBlog from '../../pages/blogs/EditBlog';
import NotFound from '../../pages/common/NotFound';

import BlogService from "./blog.service";

const BlogsRoutes = [
  { index: true,
    Component: BlogList,
    loader: async () => {
      return BlogService.getBlogs();
    },
  },
  { path: ":id", Component: SingleBlog },
  { path: "create", Component: CreateBlog },
  { path: "edit/:id", Component: EditBlog },
  { path: "*", Component: NotFound },
];

export default BlogsRoutes;
