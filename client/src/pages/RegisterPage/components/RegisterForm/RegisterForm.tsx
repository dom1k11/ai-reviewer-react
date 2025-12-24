import { useNavigate } from "react-router-dom";

type RegisterFormProps = {
  form: {
    name: string;
    email: string;
    password: string;
  };
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  errors?: {
    name?: string;
    email?: string;
    password?: string;
  };
};

const RegisterForm = ({
  form,
  onChange,
  onSubmit,
  errors,
}: RegisterFormProps) => {
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
