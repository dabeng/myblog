import classNames from 'classnames';
export default function Notification({ isActive = false, content = '', onCancel }) {

  return (
    <div className={classNames({
      "notification": true,
      "is-danger": true,
      "is-hidden": !isActive
      })}
      style={{
        position: "fixed",
        top: "0",
        width: "100%",
        zIndex: 9999
      }}>
      <button className="delete" onClick={onCancel}></button>
      {content}
    </div>
  );
}