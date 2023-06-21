import React, { useState } from "react";
import "./login.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const profileImageUrl =
    "https://www.pngmart.com/files/21/Admin-Profile-Vector-PNG-Clipart.png";

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Por favor ingresa tu email y contraseña.");
    } else if (!isValidEmail(email) || !email.endsWith("@makedigitall.com")) {
      setErrorMessage(
        "Solo se permiten correos electrónicos de la empresa MakeDigital."
      );
    } else {
      // Logica para hacer login
      console.log("Email:", email);
      console.log("Password:", password);
      setErrorMessage("");
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validDomain = "@makedigitall.com";
    const domainIndex = email.lastIndexOf(validDomain);
    const isValid =
      emailRegex.test(email) &&
      domainIndex !== -1 &&
      domainIndex === email.length - validDomain.length;
    return isValid;
  };

  return (
    <div className="login-form-container">
      <div className="login-form">
        <img src={profileImageUrl} alt="Profile" className="profile-image" />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo Electronico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="form-button">
              Login
            </button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
