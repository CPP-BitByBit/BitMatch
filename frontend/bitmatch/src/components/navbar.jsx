import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Menu, X } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export default function Navbar({ links = [] }) {
  const { user } = useUser();
  const defaultLinks = [
    { href: "/about", label: "About" },
<<<<<<< HEAD
    { href: "/browse", label: "Browse" },
    { href: "/contact", label: "Contact" },
    { href: "/my-profile", label: "My Profile" },
=======
    ...(user?.id
      ? [
          { href: "/project-list", label: "Browse" },
          { href: `/profile/${user.id}`, label: "My Profile" },
        ]
      : []),
>>>>>>> d273cc17c82f58fa65fb0d6a01dc2146af9a0b84
  ];

  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (user && !sessionStorage.getItem("seenDevelopmentModal")) {
      setShowModal(true);
      sessionStorage.setItem("seenDevelopmentModal", "true");
    }
  }, [user]);

  const navLinks = links.length > 0 ? links : defaultLinks;

  return (
    <>
      {/* Navbar */}
      <header className="w-full bg-white shadow-md p-4 fixed top-0 left-0 z-50">
        <div className="max-w-[1485px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Bitmatch logo" className="h-6 w-6" />
            <h2 className="font-sans text-xl font-black text-gray-800">
              BITMATCH
            </h2>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth & Hamburger */}
          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="px-6 py-4 text-white hover:bg-blue-700 transition duration-200 ease-in-out">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>

            {/* Hamburger Icon */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drop Down Menu - Appears Below Header */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pt-20 pb-4 space-y-2 fixed top-0 left-0 w-full z-40">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600 font-medium text-lg"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* Development Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Disclaimer</h3>
            <p className="text-sm text-gray-700">
              Bitmatch is in early development, so some features may not work as
              expected. Thanks for your patience and support as we continue to
              improve!
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Got It!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
