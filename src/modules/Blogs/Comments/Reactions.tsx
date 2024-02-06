export default function Reactions() {
  return (
    <div>
      <p className="title is-4 has-text-centered">What do you think?</p>
      <p className="subtitle is-5 has-text-centered">35 responses</p>
      <nav className="level my-6">
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">
              <i className="fa-regular fa-thumbs-up fa-4x"></i>
            </p>
            <p className="title is-4">18</p>
            <p className="heading">Upvote</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">
              <i className="fa-regular fa-face-grin-tongue-squint fa-4x"></i>
            </p>
            <p className="title is-4">1</p>
            <p className="heading">Funny</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">
              <i className="fa-regular fa-face-kiss-wink-heart fa-4x"></i>
            </p>
            <p className="title is-4">8</p>
            <p className="heading">Love</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">
              <i className="fa-regular fa-face-surprise fa-4x"></i>
            </p>
            <p className="title is-4">1</p>
            <p className="heading">Surprised</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">
              <i className="fa-regular fa-face-angry fa-4x"></i>
            </p>
            <p className="title is-4">0</p>
            <p className="heading">Angry</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">
              <i className="fa-regular fa-face-sad-tear fa-4x"></i>
            </p>
            <p className="title is-4">6</p>
            <p className="heading">Sad</p>
          </div>
        </div>
      </nav>
    </div>
  );
}
