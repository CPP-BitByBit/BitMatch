import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";

import MainNavbar from "./components/navbar";
import MainFooter from "./components/footer";

import LandingPage from "./views/LandingPage";
import HomePage from "./views/HomePage";
import ProjectListPage from "./views/ProjectListPage";
import ProjectDetailPage from "./views/IndividualProjectPage";
import AddProjectPage from "./views/AddProjectPage";
import SignUpPage from "./views/SignUpPage";
import SignInPage from "./views/SignInPage";
import OnboardPage from "./views/OnboardPage";
// import BrowsePage from "./views/BrowsePage";
// import AboutPage from "./views/AboutPage";

import "./styles/global.css";

function AppRoutes() {
  const location = useLocation();
  const { isSignedIn } = useUser();
  const isLanding = location.pathname === "/";
  const layoutClass = isLanding && !isSignedIn ? "py-8" : "container mx-auto px-4 py-16 flex pb-6 flex-col items-center justify-center min-h-screen";

  return (
    <div className={layoutClass}>
      <Routes>
        
        {/* Landing or Home */}
        <Route
          path="/"
          element={
            <>
              <SignedOut><LandingPage /></SignedOut>
              <SignedIn><HomePage /></SignedIn>
            </>
          }
        />

        {/* Signed-in only routes */}
        <Route path="/project-list" element={<SignedIn><ProjectListPage /></SignedIn>} />
        <Route path="/projects/:id" element={<SignedIn><ProjectDetailPage /></SignedIn>} />
        <Route path="/create-project" element={<SignedIn><AddProjectPage /></SignedIn>} />

        {/* Public pages */}
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/onboard" element={<OnboardPage />} />

        {/* Uncomment when ready */}
        {/*
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/about" element={<AboutPage />} />
        */}
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainNavbar />
      <AppRoutes />
      <MainFooter />
    </Router>
  );
}
