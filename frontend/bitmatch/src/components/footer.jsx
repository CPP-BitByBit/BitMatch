import { Link } from "react-router-dom";

export default function Footer({ links = [], showSocial = true }) {

  return (
    <footer className="flex flex-col items-center justify-center border-t">
      <div className="container flex flex-col items-center justify-center gap-4 py-6 px-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BITMATCH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
