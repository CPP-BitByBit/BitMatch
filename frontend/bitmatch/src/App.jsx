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
import ProjectDetailPage from "./views/IndividualProjectPage";
import "./styles/global.css";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col items-center justify-center min-h-screen">
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
          <header className="w-full bg-white shadow-md p-4 fixed top-0 left-0 flex justify-between items-center z-10">
            <a href="/">
              <h2 className="font-sans text-xl font-black text-gray-800">
                BITMATCH
              </h2>
            </a>
            <UserButton />
          </header>

          <Routes>
            {/* Home Page */}
            <Route path="/" element={<HomePage />} />

            {/* Project List Page */}
            <Route path="/project-list" element={<ProjectListPage />} />

            {/* Individual List Page */}
            <Route path="projects/:id" element={<ProjectDetailPage />} />
          </Routes>
        </SignedIn>
      </div>
    </Router>
  );
}
