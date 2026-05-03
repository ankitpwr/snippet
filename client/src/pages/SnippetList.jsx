import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import SnippetCard from "../components/snippets/SnippetCard";

const SnippetList = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch snippets on component mount
  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    try {
      const response = await axiosClient.get("/snippets");
      setSnippets(response.data);
    } catch (err) {
      setError("Failed to load snippets. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // Standard browser confirm dialog before deleting
    if (!window.confirm("Are you sure you want to delete this snippet?"))
      return;

    try {
      await axiosClient.delete(`/snippets/${id}`);
      // Remove the deleted snippet from the UI without refreshing the page
      setSnippets(snippets.filter((snippet) => snippet._id !== id));
    } catch (err) {
      alert("Failed to delete snippet");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-500">
        Loading your snippets...
      </div>
    );
  if (error)
    return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Snippets</h1>
          <p className="text-gray-500 mt-1">
            Manage and organize your code library.
          </p>
        </div>
        <Link
          to="/snippets/new"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-5 rounded shadow-sm transition-colors"
        >
          + New Snippet
        </Link>
      </div>

      {snippets.length === 0 ? (
        <div className="text-center bg-white p-12 rounded-lg shadow-sm border border-gray-200 mt-10">
          <span className="text-4xl mb-4 block">📭</span>
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            No snippets yet
          </h2>
          <p className="text-gray-500 mb-6">
            Create your first code snippet to get started.
          </p>
          <Link
            to="/snippets/new"
            className="text-blue-600 hover:underline font-medium"
          >
            Create a snippet now &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {snippets.map((snippet) => (
            <SnippetCard
              key={snippet._id}
              snippet={snippet}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SnippetList;
