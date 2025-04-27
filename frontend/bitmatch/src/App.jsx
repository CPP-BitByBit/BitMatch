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
import ProfilePage from "./views/ProfilePage";
<<<<<<< HEAD
=======
import AboutPage from "./views/AboutPage";
>>>>>>> d273cc17c82f58fa65fb0d6a01dc2146af9a0b84

import OnboardPage from "./views/OnboardPage";
import InterestPage from "./components/onboarding/Interest";
import LocationPage from "./components/onboarding/Location";
import PositionPage from "./components/onboarding/Roles";
import SkillsPage from "./components/onboarding/Skills";
import UserPage from "./components/onboarding/CreateProfile";

import "./styles/global.css";

// AppRoutes is separated for access to hooks
function AppRoutes() {
  const location = useLocation();
  const { isSignedIn } = useUser();

  const pathname = location.pathname;
  const isLanding = pathname === "/" && !isSignedIn;
  const isOnboard = pathname.startsWith("/onboard");
<<<<<<< HEAD

  const shouldUseContainer = !isLanding && !isOnboard;
=======
  const isAbout = pathname.startsWith("/about");

  const shouldUseContainer = !isLanding && !isOnboard && !isAbout;
>>>>>>> d273cc17c82f58fa65fb0d6a01dc2146af9a0b84

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
            element={
              <SignedIn>
                <ProjectListPage />
              </SignedIn>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <SignedIn>
                <ProjectDetailPage />
              </SignedIn>
            }
          />
          <Route
            path="/create-project"
            element={
              <SignedIn>
                <AddProjectPage />
              </SignedIn>
            }
          />
          <Route
<<<<<<< HEAD
            path="/my-profile"
=======
            path="/profile/:id"
>>>>>>> d273cc17c82f58fa65fb0d6a01dc2146af9a0b84
            element={
              <SignedIn>
                <ProfilePage />
              </SignedIn>
            }
          />

          {/* Onboarding */}
<<<<<<< HEAD
          <Route path="/onboard" element={<OnboardPage />}>
            <Route path="interests" element={<InterestPage />} />
            <Route path="location" element={<LocationPage />} />
            <Route path="positions" element={<PositionPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="user" element={<UserPage />} />
          </Route>
        </Routes>
      </main>

=======
          <Route
            path="/onboard"
            element={
              <SignedIn>
                <OnboardPage />
              </SignedIn>
            }
          >
            <Route
              path="interests"
              element={
                <SignedIn>
                  <InterestPage />
                </SignedIn>
              }
            />
            <Route
              path="location"
              element={
                <SignedIn>
                  <LocationPage />
                </SignedIn>
              }
            />
            <Route
              path="positions"
              element={
                <SignedIn>
                  <PositionPage />
                </SignedIn>
              }
            />
            <Route
              path="skills"
              element={
                <SignedIn>
                  <SkillsPage />
                </SignedIn>
              }
            />
            <Route
              path="user"
              element={
                <SignedIn>
                  <UserPage />
                </SignedIn>
              }
            />
          </Route>

          {/* About */}
          <Route
            path="/about"
            element={
              <>
                <AboutPage />
              </>
            }
          />

        </Routes>
      </main>

>>>>>>> d273cc17c82f58fa65fb0d6a01dc2146af9a0b84
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
