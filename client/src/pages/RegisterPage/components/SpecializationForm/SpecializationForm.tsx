type SpecializationFormProps = {
  form: {
    specialization: string;
  };
  onChange: (field: string, value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
};

const SpecializationForm = ({
  form,
  onChange,
  nextStep,
  prevStep,
}: SpecializationFormProps) => {
  return (
    <div className="login-container">
      <h1>Select Specialization</h1>

      <label>
        Specialization
        <select
          className="form-select"
          value={form.specialization}
          onChange={(e) => onChange("specialization", e.target.value)}
        >
          <option value="">Choose...</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="ai-engineering">AI Engineering</option>
          <option value="data-science">Data Science</option>
        </select>
      </label>

      <button className="btn btn-primary mt-3" onClick={nextStep}>
        Next
      </button>

      <button className="btn btn-light mt-2" onClick={prevStep}>
        Back
      </button>
    </div>
  );
};

export default SpecializationForm;
