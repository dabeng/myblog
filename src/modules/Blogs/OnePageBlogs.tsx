import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { db } from '../../shared/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useBoundStore } from '../../shared/stores/useBoundStore';

export default function OnePageBlogs() {

  
  const showModal = useBoundStore((state) => state.showModal);
  const hideModal = useBoundStore((state) => state.hideModal);
  const updateModalContent = useBoundStore((state) => state.updateModalContent);

  const blogs = useLiveQuery(
    () => db.blogs
      .toArray()
  );

  const deleteBlog = async (title) => {
    try {
      updateModalContent(`Do you really want to delete the blog -- ${title} ?`);
      showModal();
      //await db.blogs.delete(id);
    } catch (error) {
      // TODO: output error message
    }
  };

  return <>
    {blogs &&
      blogs.map((blog, index) => (
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
              <a>{blog.title}</a>
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
            <button className="button is-small is-danger is-outlined" onClick={() => deleteBlog(blog.title)}>
              <span className="icon">
                <i className="fa-solid fa-trash-can"></i>
              </span>
              <span>Delete</span>
            </button>
          </footer>
        </article>
      ))
    }</>;
}
