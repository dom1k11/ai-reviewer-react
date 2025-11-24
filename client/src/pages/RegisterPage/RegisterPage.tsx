import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { register } from "../../api/register";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { validateForm } from "../../utils/validation/validateForm";
import { registerSchema } from "../../utils/validation/authSchemas";
const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  function handleChange(field: "name" | "email" | "password", value: string) {
    setForm({ ...form, [field]: value });
  }

  async function handleRegister() {
    setErrors({});
    setSuccess("");
    const { valid, errors, data } = validateForm(registerSchema, form);
    if (!valid) {
      setErrors(errors);
      return;
    }
    try {
      // await register(data.name, data.email, data.password);
      setSuccess("✅ Registration successful! You can log in now! Redirecting...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      console.error("Registration failed", err);
      setErrors({ email: ["❌ This email is already registered"] });
    }
  }

  return (
    <RegisterForm
      name={form.name}
      email={form.email}
      password={form.password}
      errors={errors}
      success={success}
      onChange={handleChange}
      onSubmit={handleRegister}
    />
  );
};

export default RegisterPage;
