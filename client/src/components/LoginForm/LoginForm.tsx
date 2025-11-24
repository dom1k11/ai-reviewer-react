import "./LoginForm.css";

const LoginForm = ({
  email,
  password,
  loading,
  error,
  onChange,
  onSubmit,
  onGoToRegister,
  onGuestLogin,
}) => {
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
          onChange={(e) => onChange("email", e.target.value)}
        />
      </label>

      <label>Password</label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => onChange("password", e.target.value)}
      />

      <button className="btn btn-primary" onClick={onSubmit} disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </button>

      <br />

      <button className="btn btn-light" onClick={onGoToRegister}>
        New here? Sign up
      </button>

      <button className="btn btn-light" onClick={onGuestLogin}>
        Guest view
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginForm;
