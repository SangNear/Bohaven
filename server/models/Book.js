import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    size: { type: String },
    format: { type: String },
    content: { type: String },
    price: { type: Number, required: true },
    isActive: {
      type: Boolean,
      default: true
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    images: {
      type: [String],
      required: true,
    },

    // 🔥 Một sách có nhiều thể loại
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      }
    ]
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;