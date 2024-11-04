import React, { useState } from "react";
import axios from "axios";
import { InputField } from "../components";
import { CircleX } from "lucide-react";
import useAuth from "../utils/useAuth";
import PageSeo from "../components/common/PageSeo";
import Navbar from "../components/container/Navbar";

const Login = () => {
  const { loginUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    setErrors({
      email: "",
      password: "",
    });
    let isValid = true;
    let errors = { email: "", password: "" };

    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    }
    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    axios
      .post(`${process.env.REACT_APP_PUBLIC_API}/api/users/signin`, {
        email,
        password,
      })
      .then((res) => {
        const { user, accessToken, refreshToken } = res.data.data;
        console.log("User Data", user.data.data);
        loginUser(user, { accessToken, refreshToken });
        window.location.reload();
      })
      .catch((err) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: "Email or password incorrect.",
        }));
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-20 w-full">
        <Navbar />
      </div>
      <div className="w-full min-h-screen grid grid-cols-login">
        <PageSeo title="SiteBuilderz | Login" />
        <div
          style={{ backgroundImage: "url(banner.png)" }}
          className="bg-cover bg-center relative text-white flex flex-col items-center text-center"
        >
          <div className="py-32 w-full h-full bg-black/20">
            <h1 className="text-6xl drop-shadow-md">
              Simplify Your <br /> Store Management
            </h1>
            <p className="mt-5 text-lg drop-shadow-md">
              Effortlessly oversee your inventory, orders, and sales with our
              intuitive dashboard.
            </p>
          </div>
        </div>
        <div className="dark:bg-gray-900 bg-lightGreen dark:text-white px-7 py-5 flex flex-col">
          <div className="flex flex-col flex-1">
            <img
              src="/logoFull.png"
              alt=""
              className="my-20 w-full scale-110"
            />
            <InputField
              name="email"
              label="email"
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
              error={errors.email}
              onKeyDown={handleKeyDown}
              className="mb-5"
            />
            <InputField
              name="password"
              label="Password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              required={true}
              error={errors.password}
            />
            <div className="flex items-center justify-end mb-7 mt-2">
              <button
                disabled
                className="text-secondary w-fit text-sm text-end underline"
              >
                Forgot Password?
              </button>
            </div>
            {errors.general && (
              <p className="error-message flex items-center justify-center gap-1 text-red-600 bg-red-100 text-center rounded py-1 text-sm font-medium">
                <CircleX />
                {errors.general}
              </p>
            )}
            <button
              type="button"
              title="login"
              className="btnPrimary w-full text-base shadow-xl shadow-primary/20"
              onClick={handleLogin}
            >
              Login Now
            </button>
            <div className="flex items-center justify-center w-full gap-5 mt-8 mb-1">
              <div className="h-[1px] bg-gray-300 dark:bg-white/20 flex-1"></div>
              <p className="text-center text-gray-400 my-2">Or</p>
              <div className="h-[1px] bg-gray-300 dark:bg-white/20 flex-1"></div>
            </div>
            <button
              disabled
              className="btnPrimary cursor-not-allowed w-full mt-7 border border-primary bg-white shadow-none text-primary"
              type="button"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
