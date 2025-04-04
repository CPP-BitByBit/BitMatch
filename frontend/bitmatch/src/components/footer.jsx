import { Link } from "react-router-dom";

export default function Footer({ links = [], showSocial = true }) {
  const defaultLinks = [
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
    { href: "/contact", label: "Contact" },
  ];

  const footerLinks = links.length > 0 ? links : defaultLinks;

  return (
    <footer className="flex flex-col items-center justify-center border-t">
      <div className="container flex flex-col items-center justify-center gap-4 py-6 px-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BITMATCH. All rights reserved.
          </p>
        </div>

        <nav className="flex flex-wrap gap-4 md:gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {showSocial && (
          <div className="flex gap-4">
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        )}
      </div>
    </footer>
  );
}
