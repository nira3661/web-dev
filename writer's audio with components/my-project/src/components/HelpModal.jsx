export default function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="help-modal active" onClick={(e) => e.target.classList.contains('help-modal') && onClose()}>
      <div className="help-modal-inner">
        <h3>How to navigate</h3>
        <p>Hold <span className="key-demo">spacebar</span> to advance to the next writer. Release early to cancel.</p>
        <p>Click the <strong>bottom-left card</strong> to view the author profile.</p>
        <p>Click the <strong>right angle button (&gt;)</strong> or <strong>piece title</strong> to view the in-depth verse analysis.</p>
        <p>Press <span className="key-demo">ESC</span> or click ✕ in the top-right to return to the main verse page.</p>
        <p style={{ marginTop: '20px', opacity: 0.6, fontSize: '12px' }}>Recall · A literary journey</p>
        <button className="help-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}