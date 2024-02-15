import { db } from '../../../shared/db';
import { useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function CommentList() {
  const { id } = useParams();

  // Criterion filter in plain JS:
  const criterionFunction = (comment) => {
    return comment.blogId === Number.parseInt(id);
  };
  const comments = useLiveQuery(
    () => db.comments
      .orderBy('publishedDate')
      .reverse()
      .filter(criterionFunction)
      .toArray()
  );
  return (
    <div>
      <p className="title is-6 pt-6" style={{ marginBottom: "-2rem" }}>37 Comments</p>
      <div className="tabs is-right">
        <ul>
          <li className="is-active"><a>Best</a></li>
          <li><a>Newest</a></li>
          <li><a>Oldest</a></li>
        </ul>
      </div>
      {comments?.map((comment, index) => (
        <article className="media" key={index}>
          <figure className="media-left">
            <p className="image is-64x64 has-text-centered">
              <i className="fa-solid fa-user fa-4x"></i>
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <header className="comment-header">
                <strong>Author</strong>
              </header>
              <div className="comment-body">
                <Markdown remarkPlugins={[remarkGfm]}>{comment.content}</Markdown>
              </div>
              <footer className="comment-footer">
                <small><a>Like</a> · <a>Reply</a> · 3 hrs</small>
              </footer>
            </div>
          </div>
        </article>
      ))}
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64 has-text-centered">
            <i className="fa-solid fa-user fa-4x"></i>
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>Barbara Middleton</strong>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.
              <br />
              <small><a>Like</a> · <a>Reply</a> · 3 hrs</small>
            </p>
          </div>

          <article className="media">
            <figure className="media-left">
              <p className="image is-48x48 has-text-centered">
                <i className="fa-solid fa-user fa-3x"></i>
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>Sean Brown</strong>
                  <br />
                  Donec sollicitudin urna eget eros malesuada sagittis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam blandit nisl a nulla sagittis, a lobortis leo feugiat.
                  <br />
                  <small><a>Like</a> · <a>Reply</a> · 2 hrs</small>
                </p>
              </div>
            </div>
          </article>
        </div>
      </article>
    </div>
  );
}
