import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Login.css";

function Login() {
  const [mode, setMode] = useState("signin");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const changeMode = (nextMode) => {
    setMode(nextMode);
    setErrors({});
  };

  const validate = () => {
    const next = {};
    if (!username.trim()) next.username = "Username is required";
    else if (username.trim().length < 3) next.username = "At least 3 characters";

    if (mode === "signup" && !email.trim()) next.email = "Email is required";
    else if (
      mode === "signup" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) next.email = "Enter a valid email";

    if (!password) next.password = "Password is required";
    else if (password.length < 6) next.password = "At least 6 characters";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validate()) return;

    login(username.trim());
    navigate("/");
  };

  return (
    <main className="login-page">
      <div className="login-showcase"><span className="eyebrow">MEMBERS MOVE FURTHER</span><h1>Your next<br /><em>starts here.</em></h1><p>Join a community built around better movement, sharper focus and gear that keeps up.</p><div className="login-quote">“The best investment is the one that gets you moving.”</div></div>
      <div className={`login-card fade-in-up ${mode === "signup" ? "is-signup" : "is-signin"}`}>
        <div className="login-badge">S</div>
        <div className="login-switcher" role="group" aria-label="Account access">
          <button type="button" aria-pressed={mode === "signin"} className={mode === "signin" ? "active" : ""} onClick={() => changeMode("signin")}>Sign in</button>
          <button type="button" aria-pressed={mode === "signup"} className={mode === "signup" ? "active" : ""} onClick={() => changeMode("signup")}>Sign up</button>
        </div>
        <h1>{mode === "signin" ? "Welcome back." : "Start moving."}</h1>
        <p className="login-sub">{mode === "signin" ? "Sign in to your Sprintix account." : "Create your free Sprintix account."}</p>

        <form className="login-form" onSubmit={handleLogin} noValidate>
          <label>
            Username
            <input
              type="text"
              autoComplete="username"
              aria-invalid={Boolean(errors.username)}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={errors.username ? "invalid" : ""}
              placeholder="Enter your username"
            />
            {errors.username && <span className="field-error" role="alert">{errors.username}</span>}
          </label>

          {mode === "signup" && (
            <label className="signup-field">
              Email
              <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={errors.email ? "invalid" : ""} aria-invalid={Boolean(errors.email)} placeholder="you@example.com" />
              {errors.email && <span className="field-error" role="alert">{errors.email}</span>}
            </label>
          )}

          <label>
            Password
            <input
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              aria-invalid={Boolean(errors.password)}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "invalid" : ""}
              placeholder="Enter your password"
            />
            {errors.password && <span className="field-error" role="alert">{errors.password}</span>}
          </label>

          <button type="submit" className="btn btn-block">
            {mode === "signin" ? "Enter the club ↗" : "Create account ↗"}
          </button>
          <p className="form-footnote">{mode === "signin" ? "New to Sprintix? " : "Already have an account? "}<button type="button" onClick={() => changeMode(mode === "signin" ? "signup" : "signin")}>{mode === "signin" ? "Create an account" : "Sign in"}</button></p>
        </form>
      </div>
    </main>
  );
}

export default Login;
