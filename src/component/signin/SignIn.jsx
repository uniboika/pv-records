import React from "react";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";
import SingupImage from "../image/WhatsApp Image 2024-04-22 at 17.47.15_30d58e9b.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      console.log(form);
      setLoading(false);
      navigate("/dashboard");
    } else {
      Object.values(newErrors).forEach((error) => {});
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    if (!formData.email || !formData.email.trim()) {
      newErrors.email = "Email Number must be filled";
    }
    if (!formData.password || !formData.password.trim()) {
      newErrors.password = "Date must be filled";
    }
    return newErrors;
  };

  return (
    <>
      <div className="contain">
        <div className="registration-content">
          <div className="registration-image">
            <img src={SingupImage} alt="singup-img" />
          </div>
          <div className="registration-form">
            <h2>
              Brainstorm IT Solution PV <br /> Register
            </h2>
            <FormGroup>
              <Label for="Payee">Email</Label>
              <Input
                onChange={handleChange}
                id="email"
                name="email"
                value={form.email}
                type="email"
                className="form-control input-pv p-3"
                invalid={!!errors.email}
              />
              <FormFeedback>
                <span style={{ color: "red" }}>{errors.email}</span>
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="Amount">Password</Label>
              <Input
                onChange={handleChange}
                id="password"
                name="password"
                value={form.password}
                type="password"
                className="form-control input-pv p-3"
                invalid={!!errors.password}
              />
              <FormFeedback>
                <span style={{ color: "red" }}>{errors.password}</span>
              </FormFeedback>
            </FormGroup>
            <div className="pv-submit">
              <button
                type="submit"
                className="btn btn-primary btn-pv-submit"
                onClick={handleSubmit}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
