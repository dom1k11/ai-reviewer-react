type PreferenceFormProps = {
  form: {
    experience: string;
    tone: string;
    style: string;
  };
  onChange: (field: string, value: string) => void;
  prevStep: () => void;
  onFinish: () => void;
  success: string | null;
};

const PreferenceForm = ({
  form,
  onChange,
  prevStep,
  onFinish,
  success,
}: PreferenceFormProps) => {
  return (
    <div className="login-container">
      <h1>Preferences</h1>

      <label>
        Your experience
        <select
          className="form-select"
          value={form.experience}
          onChange={(e) => onChange("experience", e.target.value)}
        >
          <option value="">Choose...</option>
          <option value="0-1">0–1 years</option>
          <option value="1-3">1–3 years</option>
          <option value="3-5">3–5 years</option>
          <option value="5+">5+ years</option>
        </select>
      </label>

      <label>
        AI Review Tone
        <select
          className="form-select"
          value={form.tone}
          onChange={(e) => onChange("tone", e.target.value)}
        >
          <option value="">Choose...</option>
          <option value="soft">Soft</option>
          <option value="balanced">Balanced</option>
          <option value="strict">Strict</option>
        </select>
      </label>

      <label>
        Reply Style
        <select
          className="form-select"
          value={form.style}
          onChange={(e) => onChange("style", e.target.value)}
        >
          <option value="">Choose...</option>
          <option value="short">Short</option>
          <option value="detailed">Detailed</option>
          <option value="mentor">Mentor-like</option>
        </select>
      </label>

      {success && <p className="text-success mt-2">{success}</p>}

      <button className="btn btn-primary mt-3" onClick={onFinish}>
        Finish Registration
      </button>

      <button className="btn btn-light mt-2" onClick={prevStep}>
        Back
      </button>
    </div>
  );
};

export default PreferenceForm;
