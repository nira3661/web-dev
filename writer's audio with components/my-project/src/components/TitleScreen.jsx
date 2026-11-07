export default function TitleScreen({ holdProgress }) {
  return (
    <>
      <div id="title-screen" className="screen active">
        <div className="title-container">
          <div className="recollection-title visible">RECALL</div>
          <div className="title-sub visible">A journey through two decades of memory</div>
        </div>
      </div>

      <div className="launch-prompt visible">
        <span>Hold</span>
        <div className="spacebar-pill">
          <div className="spacebar-fill" style={{ width: `${holdProgress}%` }} />
          <span>spacebar</span>
        </div>
        <span>to launch Recall</span>
      </div>
    </>
  );
}