import React, { useState, useEffect } from "react";
import LoginComponent from "../../components/login-components/Login";
import AuthService from "../../auth/auth.service";
import {useLocation, Redirect } from "react-router-dom";


const Login = (props) => {
  const [form, setForm] = useState({ user: "", password: "" });
  const [redirectToRef, setRedirectToRef] = useState(false);
  const { state } = useLocation();

  const onSubmit = (e) => {
    e.preventDefault();
    const { user, password } = form;

    AuthService.login(user, password).then(
      (response) => {
        if (response.accessToken) {
          localStorage.setItem("user", JSON.stringify(response));
        //   props.setAuth(true);
          setRedirectToRef(true);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
  useEffect(() => {
    if (localStorage.user) {
      AuthService.verify(AuthService.getCurrentUser().accessToken).then(
        (response) => {
          console.log(response);
          if (response === true) {
            props.setAuth(true);
            setRedirectToRef(true);
          } else {
            props.setAuth(false);
            setRedirectToRef(false);
          }
        },
        (error) => {
          console.error(error);
          setRedirectToRef(false);
        }
      );
    }
  }, []);

  const onChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (redirectToRef === true) {
    return <Redirect to={state?.from || "/dashboard"} />;
  }
  return (
    <>
      <LoginComponent
        onSubmit={onSubmit}
        onChange={onChange}
        user={form.user}
        password={form.password}
      />
    </>
  );
};

export default Login;
