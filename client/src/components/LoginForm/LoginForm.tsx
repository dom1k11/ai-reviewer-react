import "./LoginForm.css";
type LoginFormProps = {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  onChange: (field: "email" | "password", value: string) => void;
  onSubmit: () => void;
  onGoToRegister: () => void;
  onGuestLogin: () => void;
};

const LoginForm = ({
  email,
  password,
  loading,
  error,
  onChange,
  onSubmit,
  onGoToRegister,
  onGuestLogin,
}: LoginFormProps) => {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <label>
        Email
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          className="form-control"
          onChange={(e) => onChange("email", e.target.value)}
        />
      </label>

      <label>Password</label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        className="form-control"
        onChange={(e) => onChange("password", e.target.value)}
      />

      <button className="btn btn-primary mb-2" onClick={onSubmit} disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </button>

      <br />

      <button className="btn btn-dark mb-2" onClick={onGoToRegister}>
        New here? Sign up
      </button>

      <button className="btn btn-light mb-2" onClick={onGuestLogin}>
        Guest view
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginForm;
