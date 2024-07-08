import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pv.css";
// import SingupImage from "../image/WhatsApp Image 2024-04-22 at 17.47.15_30d58e9b.jpg";
import SignatureCanvas from "react-signature-canvas";
import toast from "react-hot-toast";
import { _post, separator } from "../../Helper";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";
import Header from "../dashboard/Header";
import { formatNumber } from "../../reusablecomponent/FormatNumber";

export default function Pv() {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    date: "",
    payee: "",
  });
  const [signature, setSignature] = useState();
  const [url, seturl] = useState();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };
  const handleClear = () => {
    signature.clear();
    seturl("");
  };
  const handleSave = () => {
    seturl(signature.getTrimmedCanvas().toDataURL("image/png"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      _post(
        "create-pv-record",
        { ...form, url },
        () => {
          setLoading(false);
          setForm({ description: "", amount: "", date: "", payee: "" });
          toast.success("PV created successfully");
          navigate("/");
        },
        () => {
          setLoading(false);
          toast.error(
            "An error occurred while registering PV. Please try again."
          );
        }
      );
    } else {
      Object.values(newErrors).forEach((error) => {});
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};

    if (!formData.description || !formData.description.trim()) {
      newErrors.description = "Description must be filled";
    }
    // if (!formData.amount || !formData.amount.trim()) {
    //   newErrors.amount = "Amount Number must be filled";
    // }
    if (!formData.date || !formData.date.trim()) {
      newErrors.date = "Date must be filled";
    }
    if (!formData.payee || !formData.payee.trim()) {
      newErrors.payee = "Payee must be filled";
    }

    return newErrors;
  };

  return (
    <div>
      {/* <div className="contain">
        <div className="registration-content">
          <div className="registration-image">
            <img src={SingupImage} alt="singup-img" />
          </div>
          <div className="registration-form">
            <h2>
              Brainstorm IT Solution PV <br /> Register
            </h2>
            <FormGroup>
              <Label for="Description">Description/Purpose</Label>
              <Input
                onChange={handleChange}
                id="description"
                name="description"
                value={form.description}
                type="text"
                className="form-control input-pv p-3"
                invalid={!!errors.description}
              />
              <FormFeedback>
                <span style={{ color: "red" }}>{errors.description}</span>
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="Date">Date</Label>
              <Input
                onChange={handleChange}
                id="date"
                name="date"
                value={form.date}
                type="date"
                className="form-control input-pv p-3"
                invalid={!!errors.date}
              />
              <FormFeedback>
                <span style={{ color: "red" }}>{errors.date}</span>
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="Payee">Payee</Label>
              <Input
                onChange={handleChange}
                id="payee"
                name="payee"
                value={form.payee}
                type="text"
                className="form-control input-pv p-3"
                invalid={!!errors.payee}
              />
              <FormFeedback>
                <span style={{ color: "red" }}>{errors.payee}</span>
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="Amount">Amount</Label>
              <Input
                onChange={handleChange}
                id="amount"
                name="amount"
                value={form.amount}
                type="number"
                className="form-control input-pv p-3"
                invalid={!!errors.amount}
              />
              <FormFeedback>
                <span style={{ color: "red" }}>{errors.amount}</span>
              </FormFeedback>
            </FormGroup>
            <label className="mb-2">Signature</label>
            <div className="signature">
              <SignatureCanvas
                penColor="black"
                ref={(data) => setSignature(data)}
                canvasProps={{
                  width: 150,
                  height: 40,
                  className: "sigCanvas",
                }}
              />
              <div className="sign-btn">
                <button
                  onClick={handleClear}
                  className="btn btn-danger btn-sm mt-2"
                >
                  Clear
                </button>
                <button
                  onClick={handleSave}
                  className="btn btn-success btn-sm mt-2 mx-2"
                >
                  Save
                </button>
              </div>
            </div>
            <img src={url} alt="" />
            <br />
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
      </div> */}
      <Header header="PV Register" />
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        <div className="contain">
          <div className="row">
            <div className="col-md-4">
              <FormGroup>
                <Label for="Description">Description/Purpose</Label>
                <Input
                  onChange={handleChange}
                  id="description"
                  name="description"
                  value={form.description}
                  type="text"
                  className="form-control input-pv p-3"
                  invalid={!!errors.description}
                />
                <FormFeedback>
                  <span style={{ color: "red" }}>{errors.description}</span>
                </FormFeedback>
              </FormGroup>
            </div>
            <div className="col-md-4">
              <FormGroup>
                <Label for="Date">Date</Label>
                <Input
                  onChange={handleChange}
                  id="date"
                  name="date"
                  value={form.date}
                  type="date"
                  className="form-control input-pv p-3"
                  invalid={!!errors.date}
                />
                <FormFeedback>
                  <span style={{ color: "red" }}>{errors.date}</span>
                </FormFeedback>
              </FormGroup>
            </div>
            <div className="col-md-4">
              <FormGroup>
                <Label for="Payee">Payee</Label>
                <Input
                  onChange={handleChange}
                  id="payee"
                  name="payee"
                  value={form.payee}
                  type="text"
                  className="form-control input-pv p-3"
                  invalid={!!errors.payee}
                />
                <FormFeedback>
                  <span style={{ color: "red" }}>{errors.payee}</span>
                </FormFeedback>
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <FormGroup>
                <Label for="Amount">
                  Amount({parseInt(form.amount).toLocaleString()})
                </Label>
                <Input
                  onChange={handleChange}
                  id="amount"
                  name="amount"
                  value={form.amount}
                  type="text"
                  className="form-control input-pv p-3"
                  // invalid={!!errors.amount}
                />
                <FormFeedback>
                  <span style={{ color: "red" }}>{errors.amount}</span>
                </FormFeedback>
              </FormGroup>
            </div>
            <div className="col-md-4">
              <label className="mb-2">Signature</label>
              <div className="signature">
                <SignatureCanvas
                  penColor="black"
                  ref={(data) => setSignature(data)}
                  canvasProps={{
                    width: 180,
                    height: 55,
                    className: "sigCanvas",
                  }}
                />
                <div className="sign-btn">
                  <button
                    onClick={handleClear}
                    className="btn btn-danger btn-sm mt-2"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn btn-success btn-sm mt-2 mx-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4 align-items-center">
              <div className="sign-img">
                <img src={url} alt="" />
              </div>
            </div>
            <div className="pv-submit">
              <button
                type="submit"
                className="btn btn-primary btn-pv-submit mt-3"
                onClick={handleSubmit}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
