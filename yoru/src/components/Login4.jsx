import { useState } from "react";

const CardBackground = ({ activeView }) =>
  <div
    className={`card-bg ${activeView === "login" ? "login" : ""}`}
  />

const SocialButtons = () => {
  return (
    <div className="sso">
      <button className="fa-brands fa-facebook" type="button"></button>
      <button className="fa-brands fa-twitter" type="button"></button>
      <button className="fa-brands fa-instagram" type="button"></button>
    </div>
  );
};

const HeroPanel = ({ type, activeView, title, text, buttonText, onToggle }) => (
  <div className={`hero ${type} ${activeView === type ? "active" : ""}`}>
    <h2>{title}</h2>
    <p>{text}</p>
    <button type="button" onClick={onToggle}>
      {buttonText}
    </button>
  </div>
);

const RegisterForm = ({ activeView }) => {
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("Registration Data:", { fullName, email, password });
  };

  return (
    <div className={`form register ${activeView === "register" ? "active" : ""}`}>
      <h2>Sign Up</h2>
      <SocialButtons />
      <p>Or use your email address</p>
      <form onSubmit={handleRegisterSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" required />
        <input type="email" name="email" placeholder="Email Address" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">SIGN UP</button>
      </form>
    </div>
  );
};

const LoginForm = ({ activeView }) => {
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("Login Data:", { email, password });
  };

  return (
    <div className={`form login ${activeView === "login" ? "active" : ""}`}>
      <div className="form-header">YORU</div>
      <h2>Welcome Back</h2>
      <SocialButtons />
      <p>Or sign in with your email</p>
      <form onSubmit={handleLoginSubmit}>
        <input type="email" name="email" placeholder="Email address" required />
        <input type="password" name="password" placeholder="Password" required />
        <a>Forgot your password?</a>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

const Login4 = () => {
  const [activeView, setActiveView] = useState("login");

  const toggleView = () =>
    setActiveView(activeView === "login" ? "register" : "login");

  return (
    <div className="login-4-card">
      <CardBackground activeView={activeView} />
      
      <HeroPanel
        type="register"
        activeView={activeView}
        title="Welcome back"
        text="Login ...."
        buttonText="LOGIN"
        onToggle={toggleView}
      />

      <RegisterForm activeView={activeView} />
      
      <HeroPanel
        type="login"
        activeView={activeView}
        title="Hello there"
        text="Begin"
        buttonText="SIGN UP"
        onToggle={toggleView}
      />

      <LoginForm activeView={activeView} />
    </div>
  );
};

export default Login4;