import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { db } from '../../shared/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useBoundStore } from '../../shared/stores/useBoundStore';
import { Pagination } from '../../components';
import BlogService from "./blog.service";

export default function OnePageBlogs() {

  const [blogToDelete, setBlogToDelete] = useState(0);
  const showModal = useBoundStore((state) => state.showModal);
  const hideModal = useBoundStore((state) => state.hideModal);
  const updateModalContent = useBoundStore((state) => state.updateModalContent);
  const bindModalOKHandler = useBoundStore((state) => state.bindModalOKHandler);
  const bindModalCancelHandler = useBoundStore((state) => state.bindModalCancelHandler);

  const PAGE_SIZE = 4;

  const [activePage, setActivePage] = useState(1);
  const [onePageBlogs, setOnePageBlogs] = useState(null);
  const [pageTotal, setPageTotal] = useState(null);
  useEffect(() => {
    let ignore = false;
    setOnePageBlogs(null);
    BlogService.getBlogs(`?page=${activePage}&page_size=${PAGE_SIZE}&sort=-publishedDate`)
      .then(result => {
        if (!ignore) {
          setOnePageBlogs(result.data);
          setPageTotal(result.metadata.total);
        }
      });
    return () => {
      ignore = true;
    };
  }, [activePage]);

  const jumpToPage = (n) => {
    setActivePage(n);
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
    bindModalOKHandler(confirmDeleteBlog);
  }, [blogToDelete]);

  // 如果不把下面的action放在useEffect hook里面，就会报错误
  // Cannot update a component XXX while rendering a different component XXX
  // 因为bindModalCancelHandler()的调用会导致组件Layout中cancelModalHandler的变化，进而导致
  // 父组件Layout的rerender, 这样的行为是与React的unidirectional data flow机制相违背的
  useEffect(() => {
    bindModalCancelHandler(cancelDeleteBlog);
  }, []);

  const deleteBlog = (id, title) => {
    updateModalContent(`Do you really want to delete the blog -- ${title} ?`);
    showModal();
    setBlogToDelete(id);
  };

  return <>
    { onePageBlogs &&
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
              <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
            </p>
            <p className="subtitle is-6">
              {blog.subtitle}
            </p>
          </section>
          <footer className='is-flex is-justify-content-flex-end'>
            <Link to={`/blogs/edit/${blog._id}`} className="button is-small is-info mr-4">
              <span className="icon">
                <i className="fa-solid fa-pencil"></i>
              </span>
              <span>Edit</span>
            </Link>
            <button className="button is-small is-danger is-outlined" onClick={() => deleteBlog(blog._id, blog.title)}>
              <span className="icon">
                <i className="fa-solid fa-trash-can"></i>
              </span>
              <span>Delete</span>
            </button>
          </footer>
        </article>
      ))
    }
    {pageTotal &&
      <div className='py-4'>
        <Pagination total={pageTotal} pageSize={PAGE_SIZE} visibleSize={5} onChange={jumpToPage} />
      </div>
    }
  </>;
}
