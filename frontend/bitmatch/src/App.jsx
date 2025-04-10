import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import InterestPage from './components/onboarding/Interest';
import LocationPage from './components/onboarding/Location';
import PositionPage from './components/onboarding/Roles';
import SkillsPage from './components/onboarding/Skills';
import UserPage from './components/onboarding/CreateProfile';

import "./styles/global.css";

// AppRoutes is separated for access to hooks
function AppRoutes() {
  const location = useLocation();
  const { isSignedIn } = useUser();

  const pathname = location.pathname;
  const isLanding = pathname === "/" && !isSignedIn;
  const isOnboard = pathname.startsWith("/onboard");

  const shouldUseContainer = !isLanding && !isOnboard;

  const layoutClass = shouldUseContainer
    ? "container mx-auto px-4 py-16 pb-6 min-h-screen"
    : "";

  return (
    <>
      <MainNavbar />

      <main className={layoutClass}>
        <Routes>
          {/* Landing or Home */}
          <Route
            path="/"
            element={
              <>
                <SignedOut>
                  <LandingPage />
                </SignedOut>
                <SignedIn>
                  <HomePage />
                </SignedIn>
              </>
            }
          />

          {/* Signed-in only routes */}
          <Route
            path="/project-list"
            element={<SignedIn><ProjectListPage /></SignedIn>}
          />
          <Route
            path="/projects/:id"
            element={<SignedIn><ProjectDetailPage /></SignedIn>}
          />
          <Route
            path="/create-project"
            element={<SignedIn><AddProjectPage /></SignedIn>}
          />

          {/* Public pages */}
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />

          {/* Onboarding */}
          <Route path="/onboard" element={<SignedIn><OnboardPage /></SignedIn>}>
            <Route path="interests" element={<InterestPage />} />
            <Route path="location" element={<LocationPage />} />
            <Route path="positions" element={<PositionPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="user" element={<UserPage />} />
          </Route>
        </Routes>
      </main>

      <MainFooter />
    </>
  );
}

// Default export so main.jsx works
export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
