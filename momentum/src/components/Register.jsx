import React, { useState } from "react";

function RegisterScreen({ goToLogin, handleRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    handleRegister({ name, email, password });
  };

  return (
    <div className="register-screen p-10 flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
      <h1 className="font-logo text-6xl text-sky-400 text-shadow-(--my-text-shadow)">
        Momentum
      </h1>
      <h3 className="font-subtext text-xl text-green-500 mt-4 mb-2">
        Create your account and start organizing!
      </h3>

      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-6 mt-10 w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-lg"
      >
        <div className="flex flex-col gap-2">
          <label className="font-mono text-gray-300 text-sm">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="font-mono px-4 py-2 rounded-md outline-white outline-1"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-mono text-gray-300 text-sm">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="font-mono px-4 py-2 rounded-md outline-white outline-1"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-mono text-gray-300 text-sm">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="font-mono px-4 py-2 rounded-md outline-white outline-1"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-roboto text-gray-300 text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="font-mono px-4 py-2 rounded-md outline-white outline-1"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 font-display text-xl text-white px-6 py-2 rounded-md transition mt-4"
        >
          Register
        </button>
      </form>

      <p className="font-roboto text-gray-400 mt-6">
        Already have an account?{" "}
        <button
          onClick={goToLogin}
          className="text-sky-400 hover:underline font-display"
        >
          Log in
        </button>
      </p>
    </div>
  );
}

export default RegisterScreen;
