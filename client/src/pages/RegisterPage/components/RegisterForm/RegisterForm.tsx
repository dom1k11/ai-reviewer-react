import { useNavigate } from "react-router-dom";
const RegisterForm = ({ form, onChange, onSubmit, errors }) => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h1>Sign up</h1>

      <label>
        Name
        <input
          type="text"
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
        />
      </label>
      {errors?.name && <p className="error-text">{errors.name}</p>}

      <label>
        Email
        <input
          type="email"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </label>
      {errors?.email && <p className="error-text">{errors.email}</p>}

      <label>
        Password
        <input
          type="password"
          value={form.password}
          onChange={(e) => onChange("password", e.target.value)}
        />
      </label>
      {errors?.password && <p className="error-text">{errors.password}</p>}

      <button className="btn btn-primary mt-3" onClick={onSubmit}>
        Next Step
      </button>
      <button className="btn btn-light mt-2" onClick={() => navigate("/login")}>
        Back to login
      </button>
    </div>
  );
};

export default RegisterForm;
