import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { db } from '../../shared/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useBoundStore } from '../../shared/stores/useBoundStore';
import { Pagination } from '../../components';

export default function OnePageBlogs() {

  const [blogToDelete, setBlogToDelete] = useState(0);
  const showModal = useBoundStore((state) => state.showModal);
  const hideModal = useBoundStore((state) => state.hideModal);
  const updateModalContent = useBoundStore((state) => state.updateModalContent);
  const bindOKHandler = useBoundStore((state) => state.bindOKHandler);
  const bindCancelHandler = useBoundStore((state) => state.bindCancelHandler);

  const PAGE_SIZE = 4;

  // Criterion filter in plain JS:
  const criterionFunction = (blog) => {
    return true;
  };

  const allBlogs = useLiveQuery(
    () => db.blogs
      .orderBy('publishedDate')
      .reverse()
      .filter(criterionFunction)
      .toArray()
  );

  // A helper function we will use below.
  // It will prevent the same results to be returned again for next page.
  function fastForward(lastRow, idProp, otherCriterion) {
    let fastForwardComplete = false;
    return item => {
      if (fastForwardComplete) return otherCriterion(item);
      if (item[idProp] === lastRow[idProp]) {
        fastForwardComplete = true;
      }
      return false;
    };
  }

  const [onePageBlogs, setOnePageBlogs] = useState(undefined);

  const jumpToPage = async (n) => {
    if (n === 1) { // Page 1
      const blogs = await db.blogs
        .orderBy('publishedDate')
        .reverse()
        .filter(criterionFunction)
        .limit(PAGE_SIZE)
        .toArray();
        setOnePageBlogs(blogs);
    } else { // Page n (>1)
      let previousEntry = allBlogs[(n - 1) * PAGE_SIZE - 1];
      const blogs = await db.blogs
        .orderBy('publishedDate')
        .reverse()
        // Use index to fast forward as much as possible
        // This line is what makes the paging optimized
        // Use helper function to fast forward to the exact (n - 1) result:
        .filter(fastForward(previousEntry, 'id', criterionFunction))
        .limit(PAGE_SIZE)
        .toArray();
        setOnePageBlogs(blogs);
    }
  };

  const confirmDeleteBlog = async () => {
    try {
      await db.blogs.delete(blogToDelete);
    } catch (error) {
      // TODO: output error message
    } finally {
      hideModal();
    }
  };

  const cancelDeleteBlog = () => {
    hideModal();
  };

  useEffect(() => {
    bindOKHandler(confirmDeleteBlog);
  }, [blogToDelete]);

  // 如果不把下面的action放在useEffect hook里面，就会报错误
  // Cannot update a component XXX while rendering a different component XXX
  // 因为bindCancelHandler()的调用会导致组建Layout中cancelHandler的变化，进而导致
  // 父组件Layout的rerender, 这样的行为是与React的unidirectional data flow机制相违背的
  useEffect(() => {
    bindCancelHandler(cancelDeleteBlog);
  }, []);

  const deleteBlog = (id, title) => {
    updateModalContent(`Do you really want to delete the blog -- ${title} ?`);
    showModal();
    setBlogToDelete(id);
  };

  return <>
    {onePageBlogs &&
      onePageBlogs.map((blog, index) => (
        <article
          className={classNames({
            'p-4': true,
            'py-5': true,
            'has-background-light': index % 2 === 0,
          })}
          key={index}
        >
          <header>
            <span className="has-text-grey is-uppercase is-size-7 has-text-weight-bold mr-4">
              Published: <time>{(new Date(blog.publishedDate)).toLocaleDateString('zh-Hans-CN')}</time>
            </span>
            {blog.updatedDate && <span className="has-text-grey is-uppercase is-size-7 has-text-weight-bold">
              Last updated: <time>{(new Date(blog.updatedDate)).toLocaleDateString('zh-Hans-CN')}</time>
            </span>}
          </header>
          <section>
            <p className="title is-4 py-2">
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </p>
            <p className="subtitle is-6">
              {blog.subtitle}
            </p>
          </section>
          <footer className='is-flex is-justify-content-flex-end'>
            <Link to={`/blogs/edit/${blog.id}`} className="button is-small is-info mr-4">
              <span className="icon">
                <i className="fa-solid fa-pencil"></i>
              </span>
              <span>Edit</span>
            </Link>
            <button className="button is-small is-danger is-outlined" onClick={() => deleteBlog(blog.id, blog.title)}>
              <span className="icon">
                <i className="fa-solid fa-trash-can"></i>
              </span>
              <span>Delete</span>
            </button>
          </footer>
        </article>
      ))
    }
    {allBlogs &&
      <div className='py-4'>
        <Pagination total={allBlogs.length} pageSize={PAGE_SIZE} visibleSize={5} onChange={jumpToPage} />
      </div>
    }
  </>;
}
