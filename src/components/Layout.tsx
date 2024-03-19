import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import Notification from './Notification';
import { useBoundStore } from '../shared/stores/useBoundStore';
import { useAuth, AuthService } from "../modules/auth";
import logo from '../assets/logo.svg';

export default function Layout() {
  const isNotificationActive = useBoundStore((state) => state.isNotificationActive);
  const notificationContent = useBoundStore((state) => state.notificationContent);
  const notificationCancelHandler = useBoundStore((state) => state.notificationCancelHandler);
  const isModalActive = useBoundStore((state) => state.isModalActive);
  const modalContent = useBoundStore((state) => state.modalContent);
  const modalOKHandler = useBoundStore((state) => state.modalOKHandler);
  const modalCancelHandler = useBoundStore((state) => state.modalCancelHandler);
  const { accessToken, id, name, username, email, roles, clearAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout()
      .then((data) => {
        clearAuth();
        navigate('/', { replace: true });
      })
      .catch((error) => {

      })
      .finally(()=> {

      });
  };

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
                  </div>
                </div>
                {accessToken && <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">
                    <span className="icon">
                      <i className="fa-solid fa-circle-user fa-3x"></i>
                    </span>
                  </a>
                  <div className="navbar-dropdown is-right">
                    <div className="navbar-item">
                      <p>{name}</p>
                      <p>{username}</p>
                    </div>
                    <hr className="navbar-divider" />
                    <a className="navbar-item">
                      Your Profile
                    </a>
                    <hr className="navbar-divider" />
                    <a className="navbar-item" onClick={handleLogout}>
                      Log Out
                    </a>
                  </div>
                </div>}
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
      <Notification isActive={isNotificationActive} content={notificationContent} onCancel={notificationCancelHandler} />
      <Modal isActive={isModalActive} content={modalContent} onOk={modalOKHandler} onCancel={modalCancelHandler} />
    </>
  );
}
