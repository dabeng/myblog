import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
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
      .finally(() => {

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
                <NavLink
                  to="signup/"
                  className={({ isActive }) =>
                    ['navbar-item', isActive ? 'is-active' : ''].join(' ')
                  }
                >
                  Sign up
                </NavLink>
                {accessToken &&
                  <div className="navbar-item has-dropdown is-hoverable" style={{ width: 120 }}>
                    <a className="navbar-link" style={{ width: '100%' }}>
                      <span className="icon">
                        <i className="fa-solid fa-circle-user fa-3x"></i>
                      </span>
                    </a>
                    <div className="navbar-dropdown is-right" style={{ width: 200 }}>
                      <div className="navbar-item" style={{display: 'blcok'}}>
                        <p className="has-text-weight-bold has-text-grey-dark is-size-5">{name}</p>
                        <p className="is-italic has-text-grey is-size-6">{username}</p>
                      </div>
                      <hr className="navbar-divider" />
                      <NavLink to={`/profile/${id}`} className={"navbar-item"}>Your Profile</NavLink>
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
