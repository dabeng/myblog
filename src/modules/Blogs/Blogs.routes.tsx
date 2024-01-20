import { Routes, Route } from 'react-router-dom';
import BlogList from '../../pages/Blogs/BlogList';
import SingleBlog from '../../pages/Blogs/SingleBlog';
import NewBlog from '../../pages/Blogs/NewBlog';
import BlogsLayout from './BlogsLayout';
import NotFound from '../../pages/Common/NotFound';

export default function PostsRoutes() {
  return (
    <Routes>
      {/* <Route element={<BlogsLayout />}> */}
      <Route index element={<BlogList />} />
      <Route path=":id" element={<SingleBlog />} />
      <Route path="new" element={<NewBlog />} />
      <Route path="*" element={<NotFound />} />
      {/* </Route> */}
    </Routes>
  );
}
