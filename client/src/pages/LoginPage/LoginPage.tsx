import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import { login } from "../../api/login";
import { validateForm } from "../../utils/validation/validateForm";
import { loginSchema } from "../../utils/validation/authSchemas";


const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(field: "email" | "password", value: string) {
    setForm({ ...form, [field]: value });
  }

  async function handleLogin() {
    setError("");
    const { valid, errors, data } = validateForm(loginSchema, form);
    if (!valid) {
      const msg =
        errors.email?.[0] || errors.password?.[0] || "Invalid credentials";
      setError(msg);
      return;
    }
    setLoading(true);
    try {
      await login(data.email, data.password);
      navigate("/app");
    } catch (err:any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoginForm
      email={form.email}
      password={form.password}
      loading={loading}
      error={error}
      onChange={handleChange}
      onSubmit={handleLogin}
      onGoToRegister={() => navigate("/register")}
      onGuestLogin={() => navigate("/app")}
    />
  );
};

export default LoginPage;
