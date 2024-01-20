import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export default function BlogsLayout() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('/blogs');

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  return (
    <div>
      <div className="tabs">
        <ul>
          <li
            className={classNames({
              'is-active': activeTab === '/blogs' || activeTab === '/blogs/',
            })}
          >
            <Link to="/blogs">All Blogs</Link>
          </li>
          <li
            className={classNames({
              'is-active':
                activeTab === '/blogs/new' || activeTab === '/blogs/new/',
            })}
          >
            <Link to="/blogs/new">Create a Blog</Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
}
