import { db } from '../../../shared/db';
import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import CommentBox from './CommentBox';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function CommentList({blogId}) {
  // Criterion filter in plain JS:
  const criterionFunction = (comment) => {
    return comment.blogId === Number.parseInt(blogId);
  };
  const comments = useLiveQuery(
    () => db.comments
      .orderBy('publishedDate')
      .reverse()
      .filter(criterionFunction)
      .toArray((comments)=> {
        setSubCommentBoxOpen(Array.from(Array(comments.length), () => false));
        return comments;
      })
  );

  const [subCommentBoxOpen, setSubCommentBoxOpen] = useState([]);
  const toggleSubCommentBox = function (index) {
    setSubCommentBoxOpen(subCommentBoxOpen.map((open, i) => {
      if (i === index) {
        return !open;
      } else {
        return open;
      }
    }));
  };

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
              <header className="comment-header is-flex is-justify-content-space-between">
                <span className="comment-author has-text-weight-bold">Author</span>
                <time className="comment-published-date is-size-7 has-text-weight-bold has-text-grey">{(new Date(comment.publishedDate)).toLocaleDateString('zh-Hans-CN')}</time>
              </header>
              <div className="comment-body">
                <Markdown remarkPlugins={[remarkGfm]}>{comment.content}</Markdown>
              </div>
              <footer className="comment-footer">
                <p className="buttons">
                  <button className="button is-info is-inverted">
                    <span className="icon">
                      <i className="fa-regular fa-thumbs-up"></i>
                    </span>
                    <span className="upvote-count">0</span>
                  </button>
                  <button className="button is-info is-inverted">
                    <span className="icon">
                      <i className="fa-regular fa-thumbs-down"></i>
                    </span>
                    <span className="downvote-count">0</span>
                  </button>
                  <button className="button is-info is-inverted" onClick={()=> {toggleSubCommentBox(index);}}>
                    <span>Reply</span>
                  </button>
                </p>
                {subCommentBoxOpen[index] && (
                  <CommentBox blogId={Number.parseInt(blogId)} parentCommentId={comment.id} />
                )}
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
