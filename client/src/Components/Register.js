import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { context } from "./Context";
import "./style.css";

function Register() {
  const { userRegister } = useContext(context);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErr, setFormErr] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErr(validation(userDetails));
    setIsSubmit(true);
  };

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.value]: e.target.value });
  };

  useEffect(() => {
    if (Object.keys(formErr).length === 0 && isSubmit) {
      userRegister(userDetails);
    }
  }, [formErr]);

  const validation = (values) => {
    const err = {};
    const emailReg =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailReg.test(values.email)) {
      err.email = "Invalid email Id";
    }
    if (values.password.length < 7) {
      err.password = "password must contain atleast 7 characters";
    }
    if (!values.confirmPassword !== values.password) {
      err.confirmPassword = "password doesn't match";
    }
    return err;
  };

  return (
    <div className="container">
      <div>
        <h1>register</h1>
      </div>

      <div>
        <form method="POST" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button>Register</button>
            <p>
              Already have an Account? <Link to="/">LogIn</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
