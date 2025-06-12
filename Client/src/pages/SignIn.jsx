import React from "react";
import AuthForm from "../components/AuthForm";

export default function SignIn() {
// Handler for login submit
  const handleLogin = (form) => {
    // Call your login API here (replace with your actual logic)
    console.log("Login:", form);
  };

  return (
    <div className="flex flex-col items-center mt-24">
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
}
