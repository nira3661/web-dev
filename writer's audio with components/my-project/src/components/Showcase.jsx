export default function Showcase({
  writer,
  holdProgress,
  onOpenProfile,
  onOpenVerse,
  onToggleSound,
  soundEnabled,
  onOpenHelp
}) {
  return (
    <>
      <div id="showcase" className="screen active">
        <div
          className="showcase-bg"
          style={{ backgroundImage: `url('${writer.bgPic}')` }}
        />
        <div className="showcase-content">
          <div className="piece-title" onClick={onOpenVerse} title="Click to view verse analysis">
            "{writer.piece}"
          </div>
          <div className="piece-year">{writer.year}</div>
          <div className="stanza-card">
            <div className="stanza-display">{writer.stanza}</div>
          </div>
        </div>
      </div>

      <div className="bottom-bar">
        <span>Hold</span>
        <div className="spacebar-pill">
          <div className="spacebar-fill" style={{ width: `${holdProgress}%` }} />
          <span>spacebar</span>
        </div>
        <span>to switch the writer</span>
      </div>

      <div className="bottom-left-card" onClick={onOpenProfile} title="About the Writer">
        <div
          className="thumb-wrap"
          style={{ backgroundImage: `url('${writer.authorPic}')` }}
        />
        <div className="thumb-meta">
          <div className="thumb-title">{writer.name} ({writer.year})</div>
          <div className="thumb-sub">About the Writer</div>
        </div>
        <div className="thumb-dl">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      <div className="bottom-right-utility">
        <button className="right-angle-btn" onClick={onOpenVerse} title="View verse explanation">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
        <div className="bottom-right-row">
          <div className="sound-toggle" onClick={onToggleSound}>
            <span>{soundEnabled ? '🔊' : '🔇'}</span> {soundEnabled ? 'Sound' : 'Muted'}
          </div>
          <div className="need-help" onClick={onOpenHelp}>
            <span>🎧</span> Need help?
          </div>
          <div className="hashtag">#Recall</div>
        </div>
      </div>
    </>
  );
}