import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title for the snippet"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    code: {
      type: String,
      required: [true, "Please provide the snippet code"],
    },
    language: {
      type: String,
      required: [true, "Please specify the programming language"],
      default: "plaintext",
    },
    tags: {
      type: [String],
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Snippet", snippetSchema);
