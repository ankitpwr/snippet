import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const SnippetEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Grabs the ID from the URL if it exists
  const isEditing = Boolean(id);

  // Form State
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("plaintext");
  const [tags, setTags] = useState(""); // We keep this as a comma-separated string for the input field

  // UI State
  const [loading, setLoading] = useState(isEditing); // Only loading initially if we are fetching data
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Popular languages for the dropdown
  const languages = [
    { value: "plaintext", label: "Plain Text" },
    { value: "javascript", label: "JavaScript / Node.js" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "cpp", label: "C++" },
    { value: "sql", label: "SQL" },
  ];

  // Fetch snippet data if we are in edit mode
  useEffect(() => {
    if (isEditing) {
      const fetchSnippet = async () => {
        try {
          const response = await axiosClient.get(`/snippets/${id}`);
          const snippet = response.data;

          setTitle(snippet.title);
          setCode(snippet.code);
          setLanguage(snippet.language);
          // Convert the tags array back into a comma-separated string for the input
          setTags(snippet.tags ? snippet.tags.join(", ") : "");
        } catch (err) {
          setError("Failed to load snippet. It may have been deleted.");
        } finally {
          setLoading(false);
        }
      };
      fetchSnippet();
    }
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    // Convert comma-separated string back into an array of clean strings
    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag.length > 0);

    const payload = {
      title,
      code,
      language,
      tags: tagsArray,
    };

    try {
      if (isEditing) {
        await axiosClient.put(`/snippets/${id}`, payload);
      } else {
        await axiosClient.post("/snippets", payload);
      }
      // Go back to dashboard on success
      navigate("/snippets");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save snippet");
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-500">Loading editor...</div>
    );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? "Edit Snippet" : "Create New Snippet"}
        </h1>
        <Link
          to="/snippets"
          className="text-gray-500 hover:text-gray-800 font-medium"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Title Input */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., React useToggle Hook"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Language Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tags Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags{" "}
              <span className="text-gray-400 font-normal">
                (comma separated)
              </span>
            </label>
            <input
              type="text"
              placeholder="react, hooks, util"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>

        {/* Code Editor Area */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Code *
          </label>
          <textarea
            required
            rows="12"
            spellCheck="false"
            className="w-full p-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-sm bg-gray-900 text-gray-100 resize-y"
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Snippet"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SnippetEditor;
