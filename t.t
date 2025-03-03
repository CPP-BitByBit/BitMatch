import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "./components/ui/button";

// TODO: SETUP REACT ROUTER TO VIEWS
export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Show sign-in button if not authenticated */}
      <SignedOut>
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Sign in to continue
          </h1>
          <SignInButton mode="modal">
            <Button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
              Sign In
            </Button>
          </SignInButton>
        </div>
      </SignedOut>

      {/* Protected Content - Only visible when signed in */}
      <SignedIn>
        {/* Full-width User Bar */}
        <header className="w-full bg-white shadow-md p-4 fixed top-0 left-0 flex justify-between items-center z-10">
          <h2 className="text-xl font-semibold text-gray-800">Welcome</h2>
          <UserButton />
        </header>

        {/* Main Content with padding from header */}
        <div className="mt-24 w-full max-w-4xl p-8 bg-white rounded-lg shadow-md text-center">
          <h1 className="text-5xl font-bold text-gray-900">Hello World!</h1>
          <Button className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700">
            Click Me
          </Button>
          <br />
          <br />
          <h1 className="text-5xl font-bold text-gray-900">Rebecca Smith</h1>
          <a
            href="#"
            className="text-blue-500 hover:underline mt-4 inline-block"
          >
            This is a link to something
          </a>
          <br />
          <br />
          <a
            href="/project-list"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
          >
            Go to Project List
          </a>
        </div>
      </SignedIn>
    </div>
  );
}
