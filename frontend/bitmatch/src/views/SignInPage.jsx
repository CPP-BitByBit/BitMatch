import React from "react";
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          forceRedirectUrl="/"
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
