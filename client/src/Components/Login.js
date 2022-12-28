import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { context } from "./Context";
import "./style.css";

function Login() {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const { userSignIn } = useContext(context);
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.value]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validation(userDetails));
    setSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && submit) {
      userSignIn(userDetails);
    }
  }, [error]);

  const validation = (values) => {
    const err = {};
    const emailReg =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailReg.test(values.email)) {
      err.email = "Invalid email Id";
    }
    return err;
  };
  return (
    <div>
      <div className="container">
        <div>
          <h1>Login</h1>
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
              <button>LogIn</button>
              <p>
                Don't have an Account? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
