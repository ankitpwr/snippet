import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SnippetList from "./pages/SnippetList";
import SnippetEditor from "./pages/SnippetEditor"; // <-- ADD THIS IMPORT
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />

        <main className="container mx-auto px-4 pb-12 max-w-5xl">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/snippets" element={<SnippetList />} />

              {/* <-- REPLACE THE PLACEHOLDERS WITH THESE TWO LINES --> */}
              <Route path="/snippets/new" element={<SnippetEditor />} />
              <Route path="/snippets/:id" element={<SnippetEditor />} />
            </Route>

            <Route path="/" element={<Navigate to="/snippets" replace />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
