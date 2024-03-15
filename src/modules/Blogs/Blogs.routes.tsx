import { Routes, Route } from 'react-router-dom';
import BlogList from '../../pages/blogs/BlogList';
import SingleBlog from '../../pages/blogs/SingleBlog';
import CreateBlog from '../../pages/blogs/CreateBlog';
import EditBlog from '../../pages/blogs/EditBlog';
// import BlogsLayout from './BlogsLayout';
import NotFound from '../../pages/common/NotFound';

export default function PostsRoutes() {
  return (
    <Routes>
      {/* 如果想启用二级导航，可以把这个layout route取消注释<Route element={<BlogsLayout />}> */}
      <Route index element={<BlogList />} />
      <Route path=":id" element={<SingleBlog />} />
      <Route path="create" element={<CreateBlog />} />
      <Route path="edit/:id" element={<EditBlog />} />
      <Route path="*" element={<NotFound />} />
      {/* </Route> */}
    </Routes>
  );
}
