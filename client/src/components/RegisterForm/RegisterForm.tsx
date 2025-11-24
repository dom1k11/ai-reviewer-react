import "./RegisterForm.css";
import { useNavigate } from "react-router-dom";

export const RegisterForm = ({ name, email, password, errors, success, onChange, onSubmit }) => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h1>Sign up</h1>

      <label>
        Name
        <input
          placeholder="John Doe"
          type="text"
          value={name}
          onChange={(e) => onChange("name", e.target.value)}
        />
      </label>
      {errors?.name && <p className="error-text">{errors.name}</p>}

      <label>
        Email
        <input
          placeholder="email@example.com"
          type="email"
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </label>
      {errors?.email && <p className="error-text">{errors.email}</p>}

      <label>
        Password
        <input
          placeholder="Minimum 3 characters"
          type="password"
          value={password}
          onChange={(e) => onChange("password", e.target.value)}
        />
      </label>
      {errors?.password && <p className="error-text">{errors.password}</p>}

      <button className="btn btn-primary" onClick={onSubmit}>
        Sign up
      </button>

      <br />

      <button className="btn btn-light" onClick={() => navigate("/login")}>
        Back to login
      </button>

      {success && <p className="success-text">{success}</p>}
    </div>
  );
};

export default RegisterForm;
