import { BlogListToolbar, BlogListPagination, OnePageBlogs } from '../../modules/Blogs';

export default function BlogList() {
  return (
    <div>
      <BlogListToolbar />
      <OnePageBlogs />
      <BlogListPagination />
    </div>
  );
}
