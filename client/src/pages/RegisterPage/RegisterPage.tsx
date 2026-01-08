import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/register";
import { validateForm } from "../../utils/validation/validateForm";
import { registerSchema } from "../../utils/validation/authSchemas";

import { Stepper } from "react-form-stepper";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import SpecializationForm from "./components/SpecializationForm/SpecializationForm";
import PreferenceForm from "./components/PreferenceForm/PreferenceForm";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    tone: "",
    style: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function nextStep() {
    setStep((s) => s + 1);
  }

  function prevStep() {
    setStep((s) => s - 1);
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
      await register({
        name: data.name,
        email: data.email,
        password: data.password,
        specialization: form.specialization,
        experience: form.experience,
        tone: form.tone,
        style: form.style,
      });

      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setErrors({ email: ["Email already exists"], err });
    }
  }

  return (
    <>
      <Stepper
        steps={[
          { label: "Account" },
          { label: "Specialization" },
          { label: "Preferences" },
        ]}
        activeStep={step}
      />

      {step === 0 && (
        <RegisterForm
          form={form}
          errors={errors}
          onChange={handleChange}
          onSubmit={nextStep}
        />
      )}

      {step === 1 && (
        <SpecializationForm
          form={form}
          onChange={handleChange}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {step === 2 && (
        <PreferenceForm
          form={form}
          onChange={handleChange}
          prevStep={prevStep}
          onFinish={handleRegister}
          success={success}
        />
      )}
    </>
  );
};

export default RegisterPage;
