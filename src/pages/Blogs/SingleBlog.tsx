import { BlogArticle } from '../../modules/blogs';
import {
  CommentList,
  Reactions,
} from '../../modules/blogs/Comments';
import { useParams, useLoaderData } from 'react-router-dom';

export default function SingleBlog() {
  const blog: any = useLoaderData();

  return (
    <>
      <BlogArticle />
      <div className="box">
        <p className="title is-2">Comments</p>
        <Reactions />
        <CommentList blogId={blog._id} />
      </div>
    </>
  );
}
