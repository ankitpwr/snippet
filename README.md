## Prerequisites

*   Node.js installed (v16+)
*   MongoDB instance (local or Atlas)

## Installation and Running

This section outlines how to set up the project locally. It is assumed the `api` and `client` are in separate folders.

### API Setup

1.  Navigate to the `api` directory:
    ```bash
    cd api
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `api` directory and add the following (replace placeholders with actual values):
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    PORT=5000
    ```
4.  Start the API server:
    ```bash
    npm start
    ```

### Frontend Setup

1.  Open a new terminal window and navigate to the `client` directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `client` directory and add the following:
    ```env
    REACT_APP_API_URL=http://localhost:5000
    ```
4.  Start the React application:
    ```bash
    npm start
    ```

The application will automatically open in your default browser at `http://localhost:3000`.

## Usage

1.  **Sign Up:** Create a new account from the Signup page.
2.  **Log In:** Access your personal dashboard.
3.  **Create Snippet:** Click "+ New Snippet" to open the creation form. Enter a title, language, code, and relevant tags.
4.  **View & Search:** Use the dashboard to view and search for snippets by tag or language.
5.  **Edit Snippet:** Click "View / Edit" on any snippet card to make changes.
6.  **Delete Snippet:** Click "Delete" and confirm to permanently remove a snippet.

## Future Enhancements

*   [ ] Add code syntax highlighting for multiple languages.
*   [ ] Enhance search functionality to allow searching within snippet content.
*   [ ] Include a language dropdown with autocomplete during snippet creation.
*   [ ] Improve mobile responsiveness.
*   [ ] Add code copy-to-clipboard functionality on cards.

## Contributing

This is a personal project, but if you have suggestions or find issues, feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## Contact

For questions or suggestions, please contact ReHere is a detailed and professional README for the SnippetBin project, based on the provided image and project description.

***

# SnippetBin - Your Personal Code Library

![SnippetBin Dashboard](${imageUrl})
*A clean, card-based interface showing the personal snippet collection.*

## Description

SnippetBin is a personal code snippet manager designed to help developers organize, store, and quickly access their most frequently used code blocks. It offers a secure and centralized location for your code, removing the need to search through old projects or use inconvenient text files. Built as a self-study project, it demonstrates a complete full-stack application with user authentication. The application allows users to create, read, update, and delete snippets.

## Features

*   **Secure User Portal:** A private dashboard that is only accessible after a successful login. Snippets are tied directly to the logged-in user.
*   **Card-Based Interface:** A modern and clean layout for quick scanning and organization of your saved code snippets.
*   **Detailed Snippet Cards:** Each card displays:
    *   A title for the snippet (e.g., "html basic", "Basic React").
    *   A primary language tag (HTML, JAVA, JAVASCRIPT with distinct color tagging).
    *   Multiple metadata tags for search and filtering (e.g., #html, #tree, #react, #promise).
*   **Snippet Management Actions:** Direct "Delete" (red link) and "View / Edit" (dark button) actions on every snippet card.
*   **Easy Creation:** A prominent green "New Snippet" button to quickly add new code blocks.
*   **Responsive UI:** The layout is designed to be fully functional and easy to use on desktop browsers.

## Technology Stack

*   **Frontend:**
    *   React (with functional components and hooks)
    *   React Router (for client-side routing)
    *   Axios (for API communication)
    *   Modern CSS / Tailwind CSS (for styling)
*   **Backend (API):**
    *   Node.js
    *   Express.js
*   **Database:**
    *   MongoDB

## Folder Structure

The project has a clear separate between the frontend and backend.
```text
snippetbin/
├── api/          # Node/Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── client/       # React Frontend
│   ├── public/
│   └── src/
│       ├── components/  # Reusable UI components (like Card, Header)
│       ├── pages/       # Page-level components (Dashboard, Login, Signup)
│       ├── api/         # Axios configuration and API call definitions
│       ├── styles/
│       └── App.js
└── README.md
