import { Link } from "react-router-dom";

const SnippetCard = ({ snippet, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <h3
          className="text-lg font-bold text-gray-800 truncate pr-4"
          title={snippet.title}
        >
          {snippet.title}
        </h3>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded uppercase tracking-wide">
          {snippet.language}
        </span>
      </div>

      {/* Tags section */}
      <div className="flex flex-wrap gap-2 mb-4 flex-grow">
        {snippet.tags && snippet.tags.length > 0 ? (
          snippet.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))
        ) : (
          <span className="text-xs text-gray-400 italic">No tags</span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 mt-auto pt-4 border-t border-gray-100">
        <button
          onClick={() => onDelete(snippet._id)}
          className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
        >
          Delete
        </button>
        <Link
          to={`/snippets/${snippet._id}`}
          className="text-sm bg-gray-900 text-white px-3 py-1.5 rounded hover:bg-gray-800 transition-colors"
        >
          View / Edit
        </Link>
      </div>
    </div>
  );
};

export default SnippetCard;
