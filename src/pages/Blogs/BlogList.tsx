import { BlogListToolbar, BlogListPagination, OnePageBlogs } from '../../modules/Blogs';

export default function BlogList() {
  return (
    <div>
      <BlogListToolbar />
      <OnePageBlogs />
      <div className='py-4'>
        <BlogListPagination />
      </div>
    </div>
  );
}
