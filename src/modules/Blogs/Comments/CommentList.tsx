import { db } from '../../../shared/db';
import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import CommentBox from './CommentBox';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function CommentList({ blogId }) {
  const [toplevelSortField, setToplevelSortField] = useState('publishedDate');
  const [toplevelSortOrder, setToplevelSortOrder] = useState('descending');
  const [secondlevelSortField, setSecondlevelSortField] = useState('publishedDate');
  const [secondlevelSortOrder, setSecondlevelSortOrder] = useState('ascending');
  const sortToplevelComments = function (a, b) {
    if (toplevelSortOrder === 'ascending') {
      return a[toplevelSortField] - b[toplevelSortField];
    } else {
      return b[toplevelSortField] - a[toplevelSortField];
    }
  };
  const sortSecondlevelComments = function (a, b) {
    if (secondlevelSortOrder === 'ascending') {
      return a[secondlevelSortField] - b[secondlevelSortField];
    } else {
      return b[secondlevelSortField] - a[secondlevelSortField];
    }
  };
  const processComments = function (rawComments) {
    //【1】先从原始评论中，划分出top level评论和second level评论
    const topLevel = rawComments.filter((c) => !c.parentCommentId);
    const secondLevel = rawComments.filter((c) => c.parentCommentId);
    //【2】然后second level的评论插入到top level评论的subComments属性下
    secondLevel.forEach((sc) => {
      const parentComment = topLevel.find((tc) => tc.id === sc.parentCommentId);
      if (parentComment.subComments) {
        parentComment.subComments.push(sc);
      } else {
        parentComment.subComments = [sc];
      }
    });
    //【3】按照用户指定的排序规则，对top level评论和second level评论进行排序
    topLevel.sort(sortToplevelComments);
    topLevel.forEach((tc, index) => {
      tc?.subComments?.sort(sortSecondlevelComments);
    });
    //【4】最后，附带生成控制注释框显示/隐藏的标志位数组
    setCommentBoxOpen(Array.from(Array(topLevel.length), () => false));
    return topLevel;
  };
  const criterionFunction = (comment) => {
    return comment.blogId === Number.parseInt(blogId);
  };
  const comments = useLiveQuery(
    () => db.comments
      .orderBy('publishedDate')
      .reverse()
      .filter(criterionFunction)
      .toArray(processComments)
  );

  const [commentBoxOpen, setCommentBoxOpen] = useState([]);
  const toggleSubCommentBox = function (index) {
    setCommentBoxOpen(commentBoxOpen.map((open, i) => {
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
                </p>
              </footer>
            </div>
            {comment?.subComments?.map((subComment, i) => (
              <article className="media" key={i}>
                <figure className="media-left">
                  <p className="image is-64x64 has-text-centered">
                    <i className="fa-solid fa-user fa-4x"></i>
                  </p>
                </figure>
                <div className="media-content">
                  <div className="content">
                    <header className="comment-header is-flex is-justify-content-space-between">
                      <span className="comment-author has-text-weight-bold">Author</span>
                      <time className="comment-published-date is-size-7 has-text-weight-bold has-text-grey">{(new Date(subComment.publishedDate)).toLocaleDateString('zh-Hans-CN')}</time>
                    </header>
                    <div className="comment-body">
                      <Markdown remarkPlugins={[remarkGfm]}>{subComment.content}</Markdown>
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
                      </p>
                    </footer>
                  </div>
                </div>
              </article>
            ))}
            <p className="buttons">
              <button className="button is-info is-inverted" onClick={() => { toggleSubCommentBox(index); }}>
                <span>Reply</span>
              </button>
            </p>
            {commentBoxOpen[index] && (
              <CommentBox blogId={Number.parseInt(blogId)} parentCommentId={comment.id} />
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
