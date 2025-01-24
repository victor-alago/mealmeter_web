import React from 'react';
import SignupForm from '../components/SignupForm';
import NavbarLanding from '../components/NavbarLanding';
import "../assets/css/LoginPage.css"

function SignupPage() {
  return (
    <div className="login-page">
        <NavbarLanding />
        <SignupForm />
    </div>
  );
}

export default SignupPage;
