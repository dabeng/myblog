import { Link } from "react-router-dom";
import classNames from 'classnames';

const blogs = [
  {
    title: 'Angular + Reactive Forms - Email Validation Example',
    subtitle:
      'This is a quick example of how to validate an email input field in Angular with Reactive Forms.',
  },
  {
    title:
      '.NET 7.0 + Dapper + MS SQL Server - CRUD API Tutorial in ASP.NET Core',
    subtitle:
      'How to build a .NET 7.0 CRUD API with Dapper and a SQL Server database.',
  },
  {
    title:
      'Dapper + SQL Server - Create database if it does not exist on startup in ASP.NET Core',
    subtitle:
      'How to auto create a database and tables in SQL Server with ASP.NET Core and Dapper',
  },
];

export default function OnePageBlogs() {
  const blogItems = blogs.map((blog, index) => (
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
  ));

  return <>{blogItems}</>;
}
