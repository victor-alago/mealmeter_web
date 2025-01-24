import React from 'react';
import LoginForm from '../components/LoginForm';
import NavbarLanding from '../components/NavbarLanding';
import "../assets/css/LoginPage.css"

function LoginPage() {
  return (
    <div className="login-page">
        <NavbarLanding />
        <LoginForm />
    </div>
  );
}

export default LoginPage;
