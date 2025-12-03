import { presets, options } from "./constants/options";
export default function ReqSelector({ criteria, onChangeCriteria }) {
  function applyPreset(value) {
    if (!value) {
      onChangeCriteria([]);
    } else {
      onChangeCriteria(presets[value]);
    }
  }

  function handleToggle(value) {
    onChangeCriteria((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  return (
    <div className="presets" id = "presets">
      <h4>Review Presets</h4>

      <select
        className="form-select preset-select mb-3"
        onChange={(e) => applyPreset(e.target.value)}
      >
        <option value="">Select preset...</option>
        <option value="basic">Basic Review</option>
        <option value="clean">Clean Code</option>
        <option value="architecture">Architecture Focus</option>
        <option value="bugs">Bug Hunter</option>
        <option value="performance">Performance Review</option>
        <option value="security">Security Scan</option>
      </select>

      <h4>Criteria</h4>
      <div className="criteria-list">
        {options.map((opt) => (
          <div className="form-check" key={opt.id}>
            <input
              className="form-check-input"
              type="checkbox"
              id={opt.id}
              checked={criteria.includes(opt.value)}
              onChange={() => handleToggle(opt.value)}
            />
            <label className="form-check-label" htmlFor={opt.id}>
              {opt.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
