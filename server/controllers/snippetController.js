import Snippet from "../models/Snippet.js";

export const getSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(snippets);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    if (snippet.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "User not authorized to view this snippet" });
    }

    res.status(200).json(snippet);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const createSnippet = async (req, res) => {
  try {
    req.body.user = req.user.id;

    const snippet = await Snippet.create(req.body);
    res.status(201).json(snippet);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error: error.message });
  }
};

export const updateSnippet = async (req, res) => {
  try {
    let snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    if (snippet.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "User not authorized to update this snippet" });
    }

    snippet = await Snippet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(snippet);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error: error.message });
  }
};

export const deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    if (snippet.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "User not authorized to delete this snippet" });
    }

    await snippet.deleteOne();
    res.status(200).json({ message: "Snippet removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
