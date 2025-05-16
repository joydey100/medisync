import React, { useState } from "react";
import { useAdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const { token, setToken, backendUrl } = useAdminContext();
  const { docToken, setDocToken } = useDoctorContext();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // submit form  handler
  const handleSubmit = async (e) => {
    console.log(`clicked`, isAdmin);
    e.preventDefault();
    try {
      if (isAdmin) {
        const response = await axios.post(`${backendUrl}/api/admin/login`, {
          email: data.email,
          password: data.password,
        });
        const result = await response.data;
        if (result.success) {
          toast.success("Successfully logged in");
          localStorage.setItem("token", result.token);
          setToken(result.token);
        } else {
          toast.error(result.message);
        }
      } else {
        const response = await axios.post(
          `${backendUrl}/api/doctor/doctor-login`,
          {
            email: data.email,
            password: data.password,
          }
        );
        const result = await response.data;

        if (result.success) {
          localStorage.setItem("docToken", result.token);
          setDocToken(result.token);
        } else {
          alert(result.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <section className="min-h-screen py-5 flex items-center justify-center">
      <form action="" className="p-10 shadow-md" onSubmit={handleSubmit}>
        <h4 className="text-2xl font-bold text-center">
          <span className="text-primary">{isAdmin ? "Admin" : "Doctor"} </span>
          Login
        </h4>
        <div className="flex flex-col my-4">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            id="email"
            placeholder="Type your email"
            className="border p-2 mt-2 "
          />
        </div>
        <div className="flex flex-col my-4">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            id="password"
            placeholder="Password"
            className="border p-2 mt-2 "
          />
        </div>
        <button
          type="submit"
          className=" bg-primary/80 text-white w-full py-2 cursor-pointer"
        >
          Login
        </button>
        <p className="mt-3">
          {isAdmin ? "Doctor login" : "Admin login"}
          <span
            className="text-primary cursor-pointer ml-1"
            onClick={() => setIsAdmin(!isAdmin)}
          >
            Click Here
          </span>
        </p>
      </form>
    </section>
  );
};

export default Login;
