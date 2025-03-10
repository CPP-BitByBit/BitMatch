import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "./components/ui/button";
import HomePage from "./views/HomePage";
import ProjectListPage from "./views/ProjectListPage";
import './styles/global.css';

export default function App() {
  return (
    <Router>
      <div className="container mx-auto px-4 py-16 flex pb-6 flex-col items-center justify-center min-h-screen">
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

        <SignedIn>
          <header className="w-full bg-white shadow-md p-4 fixed top-0 left-0 z-50">
            <div className="max-w-[1485px] mx-auto flex justify-between items-center">
              <a href="/">
                <h2 className="font-sans text-xl font-black text-gray-800">BITMATCH</h2>
              </a>
              <UserButton />
            </div>
          </header>

          <Routes>
            {/* Home Page */}
            <Route path="/" element={<HomePage />} />

            {/* Project List Page */}
            <Route path="/project-list" element={<ProjectListPage />} />
          </Routes>
        </SignedIn>
      </div>
    </Router>
  );
}
