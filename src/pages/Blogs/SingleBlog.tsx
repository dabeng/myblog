import { BlogArticle } from '../../modules/Blogs';
import {
  CommentBox,
  CommentList,
  Reactions,
} from '../../modules/Blogs/Comments';

export default function SingleBlog() {
  return (
    <>
      <BlogArticle />
      <div className="box">
        <p className="title is-2">Comments</p>
        <Reactions />
        <CommentBox />
        <CommentList />
      </div>
    </>
  );
}
