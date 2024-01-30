import classNames from 'classnames';

export default function Modal({isActive=true, content=''}) {
  return (
    <div className={classNames({ "modal": true, "is-active": isActive })}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <article className="media">
            <figure className="media-left">
              <p className="image">
                <span className="icon is-large">
                <i className="fa-solid fa-question fa-3x"></i>
                </span>
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p className="is-size-5">
                  {content}
                </p>
              </div>
              <nav className="level">
                <div className="level-right">
                  <div className="level-item">
                    <a className="button is-danger">OK</a>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <label className="checkbox">
                      <a className="button is-info">Cancel</a>
                    </label>
                  </div>
                </div>
              </nav>
            </div>
            <div className="media-right">
              <button className="delete"></button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
