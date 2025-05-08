import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { userToken, setUserToken } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // login logic
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
          formData
        );
        setUserToken(data.token);
        localStorage.setItem("userToken", data.token);
        toast.success(data.message);
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    } else {
      // signup logic
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
          formData
        );
        console.log(data);
        setUserToken(data.token);
        localStorage.setItem("userToken", data.token);
        toast.success(data.message);
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (userToken) {
      navigate("/");
    }
  }, [userToken]);

  return (
    <section className="py-16 flex items-center justify-center">
      <div className="shadow-md rounded-xl p-10  md:min-w-lg">
        <h4 className="text-2xl font-bold mb-4">
          {" "}
          {isLogin ? "Login" : "Create Account"}{" "}
        </h4>
        <p className="text-gray-600 mb-4">
          {" "}
          Please {isLogin ? "Login" : "sign up"} to book appointment
        </p>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="full-name my-4">
              <label htmlFor="fullName">Full Name</label> <br />
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                className="w-full p-2 border "
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
          )}
          <div className="email my-4">
            <label htmlFor="email">Email</label> <br />
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-2 border  "
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="password my-4">
            <label htmlFor="password">password</label> <br />
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full p-2 border "
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <button className="bg-primary text-white w-full py-3 text-base font-medium cursor-pointer">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="cursor-pointer text-primary underline ml-2"
          >
            {isLogin ? "Create Account" : "Login Now"}
          </span>{" "}
        </p>
      </div>
    </section>
  );
};

export default Login;
