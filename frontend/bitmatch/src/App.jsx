import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "./components/ui/button";
import HomePage from "./views/HomePage";
import ProjectListPage from "./views/ProjectListPage";
import ProjectDetailPage from "./views/IndividualProjectPage";
import AddProjectPage from "./views/AddProjectPage";
import "./styles/global.css";

export default function App() {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showMaintenanceNote, setShowMaintenanceNote] = useState(true); // Toggle for maintenance note

  useEffect(() => {
    if (user && !sessionStorage.getItem("seenDevelopmentModal")) {
      setShowModal(true);
      sessionStorage.setItem("seenDevelopmentModal", "true"); // Store it for the session
    }
  }, [user]);

  return (
    <Router>
      <div className="container mx-auto px-4 py-16 flex pb-6 flex-col items-center justify-center min-h-screen">
        <SignedOut>
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              Sign in to continue
            </h1>
            {/* Maintenance Note */}
            {showMaintenanceNote && (
              <div className="bg-yellow-100 text-yellow-800 p-4 mb-4 rounded max-w-xs mx-auto">
                <strong>
                  Maintenance Notice: We are currently performing maintenance to
                  improve the performance and reliability of our service. Some
                  features may be temporarily unavailable. We appreciate your
                  patience and understanding as we work to enhance your
                  experience.
                </strong>
              </div>
            )}
            <SignInButton mode="modal">
              <Button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
                Sign In
              </Button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          {/* First Login Modal (Per Session) */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center z-[1001]">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Disclaimer
                </h2>
                <p className="text-gray-600 mb-4">
                  Bitmatch is in early development, so some features may not
                  work as expected. Thanks for your patience and support as we
                  continue to improve!
                </p>
                <p className="text-gray-600 mb-4">
                  If you experience any issues, please email us at{" "}
                  <a href="mailto:lqla@cpp.edu" className="text-blue-600">
                    lqla@cpp.edu
                  </a>
                  .
                </p>
                <Button
                  onClick={() => setShowModal(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Got it!
                </Button>
              </div>
            </div>
          )}

          <header className="w-full bg-white shadow-md p-4 fixed top-0 left-0 z-50">
            <div className="max-w-[1485px] mx-auto flex justify-between items-center">
              <a href="/">
                <h2 className="font-sans text-xl font-black text-gray-800">
                  BITMATCH
                </h2>
              </a>
              <UserButton />
            </div>
          </header>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project-list" element={<ProjectListPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/create-project" element={<AddProjectPage />} />
          </Routes>
        </SignedIn>
      </div>
    </Router>
  );
}
