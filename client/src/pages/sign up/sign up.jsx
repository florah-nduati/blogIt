import React, { useState } from "react";
import { useMutation } from "react-query";
import "./sign up.css";
import apiBase from "../utils/api";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAdress, setEmailAdress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState(null);

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: async function (newUser) {
      const response = await fetch(`${apiBase}/users`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      setFormError("Successfully signed up!");
      setTimeout(() => navigate("/login"), 2000);
    },
    onError: () => setFormError("Error signing up. Please try again."),
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    setFormError(null);
    mutate({
      firstName,
      lastName,
      emailAdress,
      username,
      password,
    });

    setFirstName("");
    setLastName("");
    setEmailAdress("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <div className="sign-up">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>New here? Sign up to create a new account</h2>

        <label htmlFor="first-name" className="label">
          First name
        </label>
        <input
          type="text"
          id="first-name"
          name="firstName"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <label htmlFor="last-name" className="label">
          Last name
        </label>
        <input
          type="text"
          id="last-name"
          name="lastName"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <label htmlFor="email" className="label">
          Email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email address"
          value={emailAdress}
          onChange={(e) => setEmailAdress(e.target.value)}
          required
        />

        <label htmlFor="username" className="label">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="enter-password" className="label">
          Password
        </label>
        <input
          type="password"
          id="enter-password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirm-password" className="label">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirm-password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" id="signUpBtn" disabled={isLoading}>
          {isLoading ? "loading.." : "sign up"}
        </button>

        <p
          className="message"
          id="message"
          style={{
            color: formError && formError.includes("Error") ? "red" : "green",
          }}
        >
          {formError}
        </p>

        <p className="signup-prompt">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
