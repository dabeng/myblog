import { useState, useEffect } from 'react';
import classNames from 'classnames';
import CommentBox from './CommentBox';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CommentService from "./comment.service";
import VoteService from "./vote.service";
import { useAuth } from "../../auth";

import './CommentList.css';

export default function CommentList({ blogId }) {
  const { accessToken, id, name, username, email, roles, clearAuth } = useAuth();


  const onAddToplevelComment = (data) => {
    setComments(cmts => [...cmts, {...data, votes: []}]);
    setCommentCollapsed(cc => [...cc, [false]]);
  };

  const onAddSecondlevelComment = (data) => {
    setComments(comments.map(c => {
      if (c._id === data.parentCommentId) {
        if (c.subComments) {
          c.subComments.push(data);
        } else {
          c.subComments = [data];
        }
      }
      return c;
    }));
  };
  const [commentTotal, setCommentTotal] = useState(0);
  const [activeCommentTab, setActiveCommentTab] = useState('likesDescending');
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
      const parentComment = topLevel.find((tc) => tc._id === sc.parentCommentId);
      if (parentComment.subComments) {
        parentComment.subComments.push(sc);
      } else {
        parentComment.subComments = [sc];
      }
    });
    //【3】按照用户指定的排序规则，对top level评论和second level评论进行排序
    const commentCollapsedInitVal = [];
    topLevel.sort(sortToplevelComments);
    topLevel.forEach((tc, index) => {
      tc?.subComments?.sort(sortSecondlevelComments);
      commentCollapsedInitVal.push([false]);
      if (tc.subComments) {
        commentCollapsedInitVal[index].push(Array.from(Array(tc.subComments.length), () => false));
      }
    });
    //【4】最后，附带生成控制显示/隐藏注释框的标志位数组、控制展开/折叠评论内容的标识位数组
    setCommentBoxOpen(Array.from(Array(topLevel.length), () => false));
    setCommentCollapsed(commentCollapsedInitVal);
    return topLevel;
  };

  const [comments, setComments] = useState(null);
  useEffect(() => {
    let sortParams = '';
    if (activeCommentTab === 'likesDescending') {
      sortParams = 'sort=-likes';
    } else if (activeCommentTab === 'dateDescending') {
      sortParams = 'sort=-publishedDate';
    } else {
      sortParams = 'sort=publishedDate';
    }
    CommentService.getComments(`?blogId=${blogId}&page_size=200&${sortParams}`)
      .then(result => {
        setComments(processComments(result.data));
        setCommentTotal(result.metadata.total);
      });
  }, [activeCommentTab]);

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
  /* 我们用一个二维数组来保存所有评论的“打开/折叠”状态
  let commentCollapsed = [
    [false, [true, false, false]],
    [false, [false, true, false]],
    [false, [false, false, true]],
    . . .
  ];
  */
  const [commentCollapsed, setCommentCollapsed] = useState([]);
  const toggleToplevelCommentCollapsed = function (index) {
    setCommentCollapsed(commentCollapsed.map((tc, i) => {
      if (i === index) {
        tc[0] = !tc[0];
      }
      return tc;
    }));
  };
  const toggleSecondlevelCommentCollapsed = function (tIndex, sIndex) {
    setCommentCollapsed(commentCollapsed.map((tc, i) => {
      if (i === tIndex) {
        tc[1][sIndex] = !tc[1][sIndex];
      }
      return tc;
    }));
  };

  const sortCommentByLikes = function () {
    setActiveCommentTab('likesDescending');
  };
  const sortCommentByDateDesc = function () {
    setActiveCommentTab('dateDescending');
  };
  const sortCommentByDateAsc = function () {
    setActiveCommentTab('dateAscending');
  };

  const upvoteComment = (commentId, tIndex, sIndex) => {
    VoteService.createVote({
      user: id,
      comment: commentId,
      createdDate: new Date(),
      upvote: 1,
      downvote: 0
    })
      .then(result => {
        if (sIndex >= 0) {
          const copy = comments.slice();
          copy[tIndex].subComments[sIndex].votes.push(result);
          setComments(copy);
        } else {
          const copy = comments.slice();
          copy[tIndex].votes.push(result);
          setComments(copy);
        }
      })
      .finally(() => {

      });
  };

  const cancelUpvoteComment = (voteId, tIndex, sIndex) => {
    return VoteService.deleteVote(voteId)
      .then(result => {
        if (sIndex >= 0) {
          const copy = comments.slice();
          const voteIndex = copy[tIndex].subComments[sIndex].votes.findIndex(v => v._id === voteId);
          copy[tIndex].subComments[sIndex].votes.splice(voteIndex, 1);
          setComments(copy);
        } else {
          const copy = comments.slice();
          const voteIndex = copy[tIndex].votes.findIndex(v => v._id === voteId);
          copy[tIndex].votes.splice(voteIndex, 1);
          setComments(copy);
        }
      })
      .finally(() => {

      });
  };

  const downvoteComment = (commentId, tIndex, sIndex) => {
    VoteService.createVote({
      user: id,
      comment: commentId,
      createdDate: new Date(),
      upvote: 0,
      downvote: 1
    })
      .then(result => {
        if (sIndex >= 0) {
          const copy = comments.slice();
          copy[tIndex].subComments[sIndex].votes.push(result);
          setComments(copy);
        } else {
          const copy = comments.slice();
          copy[tIndex].votes.push(result);
          setComments(copy);
        }
      })
      .finally(() => {

      });
  };

  const cancelDownvoteComment = (voteId, tIndex, sIndex) => {
    return VoteService.deleteVote(voteId)
      .then(result => {
        if (sIndex >= 0) {
          const copy = comments.slice();
          const voteIndex = copy[tIndex].subComments[sIndex].votes.findIndex(v => v._id === voteId);
          copy[tIndex].subComments[sIndex].votes.splice(voteIndex, 1);
          setComments(copy);
        } else {
          const copy = comments.slice();
          const voteIndex = copy[tIndex].votes.findIndex(v => v._id === voteId);
          copy[tIndex].votes.splice(voteIndex, 1);
          setComments(copy);
        }
      })
      .finally(() => {

      });
  };

  const clickUpvote = (commentId, tIndex, sIndex) => {
    // 针对“二级或顶层”评论进行表态
    const voted = sIndex >= 0 ?
      comments[tIndex].subComments[sIndex].votes.find(v => v.user === id || v.user._id === id)
      : comments[tIndex].votes.includes(v => v.user === id || v.user._id === id);
    if (voted) { // 如果已经表过态
      if (voted.upvote === 1) { // 如果已经赞过
        cancelUpvoteComment(voted._id, tIndex, sIndex);
      } else { // 如果已经踩过
        // 那就先删掉踩
        cancelDownvoteComment(voted._id, tIndex, sIndex)
          .then(() => {
            // 然后再点赞
            upvoteComment(commentId, tIndex, sIndex);
          });
      }
    } else { // 如果还未表过态
      // 那就直接点赞
      upvoteComment(commentId, tIndex, sIndex);
    }
  };

  const clickDownvote = (commentId, tIndex, sIndex) => {
    // 针对“二级或顶层”评论进行表态
    const voted = sIndex >= 0 ?
      comments[tIndex].subComments[sIndex].votes.find(v => v.user === id || v.user._id === id)
      : comments[tIndex].votes.includes(v => v.user === id || v.user._id === id);
    if (voted) { // 如果已经表过态
      if (voted.downvote === 1) { // 如果已经踩过
        cancelDownvoteComment(voted._id, tIndex, sIndex);
      } else { // 如果已经赞过
        // 那就先删掉赞
        cancelUpvoteComment(voted._id, tIndex, sIndex)
          .then(() => {
            // 然后再踩
            downvoteComment(commentId, tIndex, sIndex);
          });
      }
    } else { // 如果还未表过态
      // 那就直接踩
      downvoteComment(commentId, tIndex, sIndex);
    }
  };

  return (
    <div>
      <CommentBox blogId={blogId} addToplevelComment={onAddToplevelComment} />
      <p className="title is-6 pt-6" style={{ marginBottom: "-2rem" }}>{commentTotal} Comments</p>
      <div className="tabs is-right">
        <ul>
          <li className={classNames({
            "is-active": activeCommentTab === 'likesDescending'
          })} onClick={sortCommentByLikes}><a>Best</a></li>
          <li className={classNames({
            "is-active": activeCommentTab === 'dateDescending'
          })} onClick={sortCommentByDateDesc}><a>Newest</a></li>
          <li className={classNames({
            "is-active": activeCommentTab === 'dateAscending'
          })} onClick={sortCommentByDateAsc}><a>Oldest</a></li>
        </ul>
      </div>
      {comments?.map((comment, tIndex) => (
        <article className="media" key={tIndex}>
          <figure className="media-left">
            <p className="image is-48x48 has-text-centered">
              <i className="fa-solid fa-user fa-3x"></i>
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <header className="comment-header">
                <div className="is-flex is-justify-content-space-between">
                  <span className="comment-author is-size-5">{comment.author.username}</span>
                  <p className="buttons">
                    <button className="button is-info is-inverted" title={commentCollapsed[tIndex][0] ? "Expand" : "Collapse"} onClick={() => { toggleToplevelCommentCollapsed(tIndex); }}>
                      <span className="icon">
                        <i className={classNames({
                          "fa-solid": true,
                          "fa-plus": commentCollapsed[tIndex][0],
                          "fa-minus": !commentCollapsed[tIndex][0]
                        })}></i>
                      </span>
                    </button>
                    <button className="button is-info is-inverted" title="Flag as inappropriate">
                      <span className="icon">
                        <i className="fa-solid fa-flag"></i>
                      </span>
                    </button>
                  </p>
                </div>
                <div className="comment-date">
                  <time className="is-size-7 has-text-weight-bold has-text-grey">{(new Date(comment.publishedDate)).toLocaleDateString('zh-Hans-CN')}</time>
                </div>
              </header>
              {!commentCollapsed[tIndex][0] &&
                <>
                  <div className="comment-body">
                    <Markdown remarkPlugins={[remarkGfm]}>{comment.content}</Markdown>
                  </div>
                  <footer className="comment-footer">
                    <div className="buttons">
                      <div className="dropdown is-hoverable is-up">
                        <div className="dropdown-trigger">
                          <button aria-haspopup="true" className="button is-info is-inverted" onClick={() => { clickUpvote(comment._id, tIndex, -1) }}>
                            <span className="icon">
                              <i className="fa-regular fa-thumbs-up"></i>
                            </span>
                            <span className="upvote-count">{(!comment.votes || comment.votes.length === 0) ? 0 : comment.votes?.filter(v => v.upvote === 1).length}</span>
                          </button>
                        </div>
                        {comment?.votes.filter(v => v.upvote === 1).length > 0 &&
                          <div className="dropdown-menu" role="menu">
                            <div className="dropdown-content">
                              {comment?.votes.filter(v => v.upvote === 1).map((v) => (
                                <a key={v._id} href="#" className="dropdown-item">{v.username ? v.username : v.user.username}</a>
                              ))}
                            </div>
                          </div>
                        }
                      </div>
                      <div className="dropdown is-hoverable is-up">
                        <div className="dropdown-trigger">
                          <button aria-haspopup="true" className="button is-info is-inverted" onClick={() => { clickDownvote(comment._id, tIndex, -1) }}>
                            <span className="icon">
                              <i className="fa-regular fa-thumbs-down"></i>
                            </span>
                            <span className="downvote-count">{(!comment.votes || comment.votes.length === 0) ? 0 : comment.votes.filter(v => v.downvote === 1).length}</span>
                          </button>
                        </div>
                        {comment?.votes.filter(v => v.downvote === 1).length > 0 &&
                          <div className="dropdown-menu" role="menu">
                            <div className="dropdown-content">
                              {comment?.votes.filter(v => v.downvote === 1).map((v) => (
                                <a key={v._id} href="#" className="dropdown-item">{v.username ? v.username : v.user.username}</a>
                              ))}
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </footer>
                </>
              }
            </div>
            {!commentCollapsed[tIndex][0] &&
              <>
                {comment?.subComments?.map((subComment, sIndex) => (
                  <article className="media" key={sIndex}>
                    <figure className="media-left">
                      <p className="image is-32x32 has-text-centered">
                        <i className="fa-solid fa-user fa-2x"></i>
                      </p>
                    </figure>
                    <div className="media-content">
                      <div className="content">
                        <header className="comment-header">
                          <div className="is-flex is-justify-content-space-between">
                            <span className="comment-author is-size-5">{subComment.author.username}</span>
                            <p className="buttons">
                              <button className="button is-info is-inverted" title={commentCollapsed[tIndex][1][sIndex] ? "Expand" : "Collapse"} onClick={() => { toggleSecondlevelCommentCollapsed(tIndex, sIndex); }}>
                                <span className="icon">
                                  <i className={classNames({
                                    "fa-solid": true,
                                    "fa-plus": commentCollapsed[tIndex][1][sIndex],
                                    "fa-minus": !commentCollapsed[tIndex][1][sIndex]
                                  })}></i>
                                </span>
                              </button>
                              <button className="button is-info is-inverted" title="Flag as inappropriate">
                                <span className="icon">
                                  <i className="fa-solid fa-flag"></i>
                                </span>
                              </button>
                            </p>
                          </div>
                          <div>
                            <time className="comment-published-date is-size-7 has-text-weight-bold has-text-grey">{(new Date(subComment.publishedDate)).toLocaleDateString('zh-Hans-CN')}</time>
                          </div>
                        </header>
                        {!commentCollapsed[tIndex][1][sIndex] &&
                          <>
                            <div className="comment-body">
                              <Markdown remarkPlugins={[remarkGfm]}>{subComment.content}</Markdown>
                            </div>
                            <footer className="comment-footer">
                              <div className="buttons">
                                <div className="dropdown is-hoverable is-up">
                                  <div className="dropdown-trigger">
                                    <button aria-haspopup="true" className="button is-info is-inverted" onClick={() => { clickUpvote(subComment.id, tIndex, sIndex) }}>
                                      <span className="icon">
                                        <i className="fa-regular fa-thumbs-up"></i>
                                      </span>
                                      <span className="upvote-count">{(!subComment.votes || subComment.votes.length === 0) ? 0 : subComment.votes.filter(v => v.upvote === 1).length}</span>
                                    </button>
                                  </div>
                                  {subComment?.votes.filter(v => v.upvote === 1).length > 0 &&
                                    <div className="dropdown-menu" role="menu">
                                      <div className="dropdown-content">
                                        {subComment?.votes.filter(v => v.upvote === 1).map((v) => (
                                          <a key={v._id} href="#" className="dropdown-item">{v.username ? v.username : v.user.username}</a>
                                        ))}
                                      </div>
                                    </div>
                                  }
                                </div>
                                <div className="dropdown is-hoverable is-up">
                                  <div className="dropdown-trigger">
                                    <button className="button is-info is-inverted" onClick={() => { clickDownvote(subComment._id, tIndex, sIndex) }}>
                                      <span className="icon">
                                        <i className="fa-regular fa-thumbs-down"></i>
                                      </span>
                                      <span className="downvote-count">{(!subComment.votes || subComment.votes.length === 0) ? 0 : subComment.votes.filter(v => v.downvote === 1).length}</span>
                                    </button>
                                  </div>
                                  {subComment?.votes.filter(v => v.downvote === 1).length > 0 &&
                                    <div className="dropdown-menu" role="menu">
                                      <div className="dropdown-content">
                                        {subComment?.votes.filter(v => v.downvote === 1).map((v) => (
                                          <a key={v._id} href="#" className="dropdown-item">{v.username ? v.username : v.user.username}</a>
                                        ))}
                                      </div>
                                    </div>
                                  }
                                </div>
                              </div>
                            </footer>
                          </>
                        }
                      </div>
                    </div>
                  </article>
                ))}
                <p className="buttons">
                  <button className="button is-info is-inverted" onClick={() => { toggleSubCommentBox(tIndex); }}>
                    <span>Reply</span>
                  </button>
                </p>
                {commentBoxOpen[tIndex] && (
                  <CommentBox blogId={blogId} parentCommentId={comment._id} addSecondlevelComment={onAddSecondlevelComment} />
                )}
              </>
            }
          </div>
        </article>
      ))}
    </div>
  );
}
