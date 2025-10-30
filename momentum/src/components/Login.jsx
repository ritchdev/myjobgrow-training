import React, { useState } from "react";

function LoginScreen({ goToRegister, handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="login-screen p-10 flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
      <h1 className="font-logo text-6xl text-sky-400 text-shadow-(--my-text-shadow)">
        Momentum
      </h1>
      <h3 className="font-subtext text-xl text-green-500 mt-8 mb-10">
        Welcome back, let’s get things done!
      </h3>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-6 mt-10 w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-lg"
      >
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="font-mono px-4 py-2 rounded-md outline-white outline-1"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 font-display text-xl text-white px-6 py-2 rounded-md transition mt-4"
        >
          Log In
        </button>
      </form>

      <p className="font-roboto text-gray-400 mt-6">
        Don’t have an account?{" "}
        <button
          onClick={goToRegister}
          className="text-sky-400 hover:underline font-display"
        >
          Register here
        </button>
      </p>
    </div>
  );
}

export default LoginScreen;
