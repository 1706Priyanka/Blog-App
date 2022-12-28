import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";

export const context = createContext();

export const ContextProvider = (props) => {
  const Nav = useNavigate();
  const [email, setEmail] = useState("");

  const userSignIn = (loginData) => {
    axios
      .post("http://localhost:5000/login", loginData)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("email", loginData.email);
        Nav("/blog");
        window.alert("login Successful");
        document.location.reload();
        setEmail(loginData.email);
      })
      .catch((e) => {
        window.alert("login failed");
        console.log(e);
      });
  };

  const config = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };

  const userRegister = (userData) => {
    axios
      .post("http://localhost:5000/register", userData)
      .then((res) => {
        Nav("/");
      })
      .catch((e) => {
        window.alert("failed");
        console.log(e);
      });
  };

  return (
    <context.Provider
      value={{
        userSignIn,
        userRegister,
        email,
      }}
    >
      {props.children}
    </context.Provider>
  );
};
