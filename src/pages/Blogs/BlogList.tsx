import { BlogListPagination, OnePageBlogs } from '../../modules/Blogs';

export default function BlogList() {
  return (
    <div className="is-flex-direction-column">
      <OnePageBlogs />
      <BlogListPagination />
    </div>
  );
}
