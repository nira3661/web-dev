export default function VerseExplanationModal({ writer, isOpen, onClose, onSwitchToWriter, onOpenHelp }) {
  if (!isOpen) return null;

  return (
    <div className="writer-profile-overlay verse-profile-overlay open" aria-hidden="false">
      <div className="top-left-logo">
        <div className="logo-box">
          <svg viewBox="0 0 100 100" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 28 C5 41 5 61 16 74" strokeOpacity="0.35" strokeWidth="1.8" />
            <path d="M23 37 C15 45 15 57 23 65" strokeOpacity="0.7" strokeWidth="2.2" />
            <path d="M77 37 C85 45 85 57 77 65" strokeOpacity="0.7" strokeWidth="2.2" />
            <path d="M84 28 C95 41 95 61 84 74" strokeOpacity="0.35" strokeWidth="1.8" />
            <path d="M50 14 L33 50 C34 63 39 71 39 80 L61 80 C61 71 66 63 67 50 Z" />
            <line x1="50" y1="14" x2="50" y2="44" strokeWidth="2" />
            <circle cx="50" cy="47" r="3.2" fill="#ffffff" stroke="none" />
            <path d="M39 52 C44 38 47 26 48 20" strokeWidth="1.5" strokeOpacity="0.6" />
            <path d="M61 52 C56 38 53 26 52 20" strokeWidth="1.5" strokeOpacity="0.6" />
            <line x1="36" y1="84" x2="64" y2="84" strokeWidth="2.2" />
          </svg>
          <div className="logo-name">RECALL</div>
        </div>
        <div className="header-meta">{writer.name.toUpperCase()} / {writer.piece.toUpperCase()} — VERSE ANALYSIS</div>
      </div>

      <div className="top-right">
        <div className="recollection-brand">RECALL</div>
        <div className="close-btn" onClick={onClose} title="Close Verse Analysis">✕</div>
      </div>

      <div className="bg-stage">
        <div className="bg-photo" style={{ backgroundImage: `url('${writer.versePic || writer.bgPic}')` }} />
      </div>

      <div className="editorial-card">
        <div className="left-pane">
          <div className="portrait-wrap verse-stanza-wrap">
            <div className="pulse-ring" />
            <div className="verse-quote-card">
              <div className="quote-mark">“</div>
              <div className="quote-text">{writer.keyQuote}</div>
              <div className="quote-author">{writer.name.toUpperCase()}, {writer.year}</div>
            </div>
          </div>
        </div>
        <div className="right-pane">
          <div className="year-tag">VERSE ANALYSIS · {writer.year}</div>
          <div className="author-title">{writer.piece}</div>
          <div className="work-subtitle">{writer.name}</div>
          <div className="bio-excerpt">{writer.explanation}</div>
          <div className="verse-actions">
            <div className="discover-link" onClick={onClose}>Return to main verse page →</div>
            <div className="discover-link" onClick={onSwitchToWriter} style={{ borderColor: '#fff', color: '#fff' }}>
              View author's biography →
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-right">
        <div className="need-help" onClick={onOpenHelp}><span>🎧</span> Need help?</div>
        <div className="hashtag">#Recall</div>
      </div>
    </div>
  );
}