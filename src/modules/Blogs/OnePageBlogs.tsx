import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { db } from '../../shared/db';
import { useLiveQuery } from 'dexie-react-hooks';



export default function OnePageBlogs() {

  const blogs = useLiveQuery(
    () => db.blogs
      .toArray()
  );

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
              Published:<time>08.12.2014</time>
            </span>
            <span className="has-text-grey is-uppercase is-size-7 has-text-weight-bold">
              Last updated:<time>08.12.2014</time>
            </span>
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
            <Link to="edit" className="button is-small is-info mr-4">
              <span className="icon">
                <i className="fa-solid fa-pencil"></i>
              </span>
              <span>Edit</span>
            </Link>
            <button className="button is-small is-danger is-outlined">
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
