import React from "react";
import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          forceRedirectUrl="/onboard"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-md rounded-lg",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
            },
          }}
        />
      </div>
    </div>
  );
}
