const ReqSelector = () => {
    return ( <><div className="requirements">
        <h4>Review Presets</h4>
        <select className="form-select preset-select mb-3">
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
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="crit-style"
            />
            <label className="form-check-label" htmlFor="crit-style">
              Code Style
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="crit-read"
            />
            <label className="form-check-label" htmlFor="crit-read">
              Readability
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="crit-naming"
            />
            <label className="form-check-label" htmlFor="crit-naming">
              Naming
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="crit-arch"
            />
            <label className="form-check-label" htmlFor="crit-arch">
              Architecture
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="crit-bugs"
            />
            <label className="form-check-label" htmlFor="crit-bugs">
              Bug Detection
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="crit-perf"
            />
            <label className="form-check-label" htmlFor="crit-perf">
              Performance
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="crit-security"
            />
            <label className="form-check-label" htmlFor="crit-security">
              Security
            </label>
          </div>
        </div>
      </div></> );
}
 
export default ReqSelector;