import { Outlet, NavLink } from 'react-router-dom';
import Modal from './Modal';
import { useBoundStore } from '../shared/stores/useBoundStore';
import logo from '../assets/logo.svg';

export default function Layout() {
  const isModalActive = useBoundStore((state) => state.isModalActive);
  const modalContent = useBoundStore((state) => state.modalContent);

  return (
    <>
      <div
        className="columns is-desktop has-background-primary"
        style={{ paddingTop: '0.75rem' }}
      >
        <div className="column is-8 is-offset-2">
          <nav
            className="navbar is-primary"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <a className="navbar-item" href="https://bulma.io">
                <img
                  src={logo}
                  width="70"
                  height="70"
                  style={{ maxHeight: 'unset' }}
                />
                <p
                  className="title is-1 has-text-white"
                  style={{ marginLeft: '1rem' }}
                >
                  Dabeng's Blog
                </p>
              </a>
            </div>

            <div className="navbar-menu">
              <div className="navbar-start">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    ['navbar-item', isActive ? 'is-active' : ''].join(' ')
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="blogs/"
                  className={({ isActive }) =>
                    ['navbar-item', isActive ? 'is-active' : ''].join(' ')
                  }
                >
                  Blogs
                </NavLink>
              </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <a className="button is-primary">Sign up</a>
                    <a className="button is-light">Log in</a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="columns is-desktop">
        <div className="column is-8 is-offset-2">
          <Outlet />
        </div>
      </div>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>Bulma</strong> by{' '}
            <a href="https://github.com/dabeng">Xuebin Dong</a>. The source code
            is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>
          </p>
        </div>
      </footer>
      <Modal isActive={isModalActive} content={modalContent}/>
    </>
  );
}
