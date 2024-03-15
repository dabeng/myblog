import { BlogArticle } from '../../modules/blogs';
import {
  CommentBox,
  CommentList,
  Reactions,
} from '../../modules/blogs/Comments';
import { useParams } from 'react-router-dom';

export default function SingleBlog() {
  const { id } = useParams();

  return (
    <>
      <BlogArticle />
      <div className="box">
        <p className="title is-2">Comments</p>
        <Reactions />
        <CommentBox blogId={Number.parseInt(id)} />
        <CommentList blogId={Number.parseInt(id)} />
      </div>
    </>
  );
}
