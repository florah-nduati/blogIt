import React, { useState } from "react";
import { useMutation } from "react-query";
import useUserStore from "../store/userStore";
import "./login.css";
import apiBase from "../utils/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: async function (credentials) {
      const response = await fetch(`${apiBase}/auth/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (user) => {
      setUser(user);
      localStorage.setItem("isAuthenticated", "true");
      setFormError("Login successful!");
      setTimeout(() => navigate("/blogs"), 1000);
    },
    onError: () => setFormError("Invalid credentials, please try again."),
  });

  function handleSubmit(e) {
    e.preventDefault();
    setFormError(null);

    if (!usernameOrEmail) {
      setFormError("Please enter your username or email.");
      return;
    }
    if (!password) {
      setFormError("Please enter your password.");
      return;
    }

    const payload = {
      username: usernameOrEmail,
      emailAdress: usernameOrEmail,
      password,
    };

    mutate(payload);

    setUsernameOrEmail("");
    setPassword("");
  }

  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Log In to Your Account</h2>

        <label htmlFor="username-email" className="labels">
          Username or Email
        </label>
        <input
          type="text"
          id="username-email"
          name="usernameOrEmail"
          placeholder="Enter your username or email"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          required
        />

        <label htmlFor="password" className="labels">
          Password
        </label>
        <input
          type="text"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" id="signInBtn" disabled={isLoading}>
          {isLoading ? "Loading..." : "Log In"}
        </button>

        <p
          className="message"
          id="message"
          style={{
            color: formError && formError.includes("Invalid") ? "red" : "green",
          }}
        >
          {formError}
        </p>

        <p className="login-prompt">
          Don't have an account? <a href="/sign up">Create One</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
