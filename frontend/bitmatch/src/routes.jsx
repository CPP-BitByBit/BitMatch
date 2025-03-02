import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProjectListPage } from "./pages/ProjectListPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project-list" element={<ProjectListPage />} />
        
        {/* Catch-all route for unmatched paths */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
