import { BlogArticle } from '../../modules/blogs';
import {
  CommentBox,
  CommentList,
  Reactions,
} from '../../modules/blogs/Comments';
import { useParams, useLoaderData } from 'react-router-dom';

export default function SingleBlog() {
  const { id } = useParams();
  const blog: any = useLoaderData();

  return (
    <>
      <BlogArticle />
      <div className="box">
        <p className="title is-2">Comments</p>
        <Reactions />
        <CommentBox blogId={Number.parseInt(id)} />
        <CommentList blogId={blog._id} />
      </div>
    </>
  );
}
