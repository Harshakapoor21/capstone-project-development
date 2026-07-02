import { useState } from "react";
import { login } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("LOGIN FORM:", form);
      const res = await login(form);

      console.log("========== LOGIN RESPONSE ==========");
      console.log(res);
      console.log("Response Data:", res.data);
      console.log("===================================");

      if (!res.data) {
        alert("Login API returned an empty response.");
        return;
      }

      localStorage.setItem("token", res.data);

      console.log("Saved Token:", localStorage.getItem("token"));

      alert("Login Successful!");

      const payload = JSON.parse(
  atob(
    res.data
      .split(".")[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/")
  )
);

if (payload.role === "INSTRUCTOR") {
  navigate("/instructor");
} else {
  navigate("/student");
}

    } catch (err) {
      console.error(err);

      if (err.response) {
        alert(err.response.data);
      } else {
        alert("Network Error");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-6">
          LMS Login
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded mb-4"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded mb-4"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;