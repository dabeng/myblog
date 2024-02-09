import classNames from 'classnames';
export default function Notification({ isActive = false, content = '' }) {

  return (
    <div className={classNames({
      "notification": true,
      "is-danger": true,
      "is-light": true,
      "is-hidden": !isActive
      })}>
      <button className="delete"></button>
      {content}
    </div>
  );
}