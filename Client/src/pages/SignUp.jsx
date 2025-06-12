import React from "react";
import AuthForm from "../components/AuthForm";
export default function SignUp() {
  const handleSignup = (form) => {
    // Call your signup API here (replace with your actual logic)
    console.log("Signup:", form);
  };
  return (
    <div className="flex flex-col items-center mt-24">
      <AuthForm type="signup" onSubmit={handleSignup} />
    </div>
  );
}
