import { Link } from "react-router-dom"; // Import Link from react-router-dom

export const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">Welcome to the Home Page</h1>
        
        {/* Link to ProjectListPage */}
        <Link
          to="/project-list"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          Go to Project List
        </Link>
      </div>
    </div>
  );
};
