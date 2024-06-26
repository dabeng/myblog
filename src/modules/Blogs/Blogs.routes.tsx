import BlogList from '../../pages/blogs/BlogList';
import SingleBlog from '../../pages/blogs/SingleBlog';
import CreateBlog from '../../pages/blogs/CreateBlog';
import EditBlog from '../../pages/blogs/EditBlog';
import NotFound from '../../pages/common/NotFound';

import BlogService from "./blog.service";

const BlogsRoutes = [
  {
    index: true,
    Component: BlogList,
  },
  {
    path: ":id",
    Component: SingleBlog,
    loader: ({ params }) => {
      return BlogService.getOneBlogById(params.id);
    },
  },
  { path: "create", Component: CreateBlog },
  { path: "edit/:id", Component: EditBlog },
  { path: "*", Component: NotFound },
];

export default BlogsRoutes;
