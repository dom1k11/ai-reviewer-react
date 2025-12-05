import "./Loader.css";

export default function Loader({ size = "lg", color = "primary" }) {
  return (
    <div className="loader-wrapper fade-in">
      <div
        className={`spinner-border text-${color} loader-${size}`}
        role="status"
      >
        <span className="sr-only"></span>
      </div>
    </div>
  );
}
