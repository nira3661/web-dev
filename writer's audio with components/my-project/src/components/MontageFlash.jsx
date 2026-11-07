export default function MontageFlash({ active, frameUrl }) {
  if (!active) return null;
  return (
    <div id="montage" className="active">
      <div className="montage-frame" style={{ backgroundImage: `url('${frameUrl}')` }} />
    </div>
  );
}