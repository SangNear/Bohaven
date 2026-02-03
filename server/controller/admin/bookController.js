import mongoose from "mongoose";
import Book from "../../models/Book.js";
import Category from "../../models/Category.js"
export const createBook = async (req, res) => {
    try {
        const { title, author, publishedYear, size, format, content, price, images, categories } = req.body
        if (!title || !author || !publishedYear || !price) {
            return res.status(400).json({
                message: "Missing field"
            })
        }

        if (!Array.isArray(images) || images.length === 0) {
            return res.status(400).json({
                message: "At least 1 image to create"
            })
        }

        if (!Array.isArray(categories) || categories.length === 0) {
            return res.status(400).json({
                message: "Book must belong to at least one category",
            });
        }

        const validCategories = categories.filter((id) =>
            mongoose.Types.ObjectId.isValid(id)
        )  //lấy những id category có định dạng đúng với mongoDB id

        if (validCategories.length !== categories.length) {
            return res.status(400).json({
                message: "Invalid category id",
            });
        } // nếu một trong các category từ client ko hợp lệ thì reject request

        const activeCategories = await Category.find({
            _id: { $in: validCategories },
            isActive: true
        }) // kiểm tra các category đó có active ko

        if (activeCategories.length === 0) {
            return res.status(400).json({
                message: "No active category found",
            });
        }
        if (!validCategories.length || !activeCategories.length) {
            return res.status(400).json({
                message: "Some categories are inactive or not found",
            });
        }

        const newBook = await Book.create({
            title: title.trim(),
            author: author.trim(),
            publishedYear,
            price,
            size,
            format,
            content,
            images,
            categories: validCategories,
        });

        return res.status(201).json({
            message: "Product created successfully",
            data: newBook
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json("Error Occur at create product")
    }
}
export const uploadImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                message: "No files uploaded",
            });
        }

        // Cloudinary URL nằm ở file.path
        const imageUrls = req.files.map((file) => file.path);

        return res.status(200).json({
            message: "Upload images successfully",
            data: imageUrls,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({
            message: "Upload image failed",
        });
    }
}

export const updateBook = async (req, res) => {
    try {
        const { id } = req.params
        const { title, author, publishedYear, size, format, content, price, images, categories } = req.body

        const book = await Book.findById(id)
        if (!book) {
            return res.status(404).json({
                message: "Book not found",
            });
        }
        if (images !== undefined) {
            if (!Array.isArray(images) || images.length === 0) {
                return res.status(400).json({
                    message: "Book must have at least one image",
                });
            }
            book.images = images
        }


        if (categories !== undefined) {
            if (!Array.isArray(categories) || categories.length === 0) {
                return res.status(400).json({
                    message: "Book must belong to at least one category",
                });
            }

            const validCategories = categories.filter((id) =>
                mongoose.Types.ObjectId.isValid(id)
            )

            if (validCategories.length !== categories.length) {
                return res.status(400).json({
                    message: "Invalid category id",
                });
            }

            const activeCategory = await Category.find({
                _id: { $in: validCategories },
                isActive: true
            })
            if (activeCategory.length !== validCategories.length) {
                return res.status(400).json({
                    message: "Some categories are inactive or not found",
                });
            }

            book.categories = validCategories
        }

        if (title !== undefined) book.title = title
        if (author !== undefined) book.author = author.trim()
        if (publishedYear !== undefined) book.publishedYear = publishedYear
        if (price !== undefined) book.price = price
        if (size !== undefined) book.size = size
        if (format !== undefined) book.format = format
        if (content !== undefined) book.content = content

        await book.save()
        return res.status(200).json({
            message: "Book updated successfully",
            data: book,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error occurred while updating book",
        });
    }
}
export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            })
        }
        if (!book.isActive) {
            return res.status(404).json({
                message: "Book already deleted"
            })
        }

        book.isActive = false
        await book.save()
        return res.status(200).json({
            message: "Book deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error occurred while deleting book",
        });
    }
}

export const getListBook = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, search, sort = 1 } = req.query

        let filter = {
            isActive: true
        }

        if (category) {
            if (!mongoose.Types.ObjectId.isValid(category)) {
                return res.status(400).json({
                    message: "Invalid category id",
                });
            }
            filter.categories = category;
        }
        if (search) {
            filter.title = { $regex: search, $options: "i" }
        }

        let sortOptions = {}

        switch (sort) {
            case "price_asc":
                sortOptions.price = 1
            case "price_desc":
                sortOptions.price = -1
            default:
                sortOptions.createdAt = -1
        }

        const skip = (page - 1) * limit
        const [books, totalItems] = await Promise.all([
            Book.find(filter).populate("categories", "name").sort(sortOptions).skip(skip).limit(Number(limit)),

            Book.countDocuments(filter)
        ])
        return res.status(200).json({
            data: books,
            pagination: {
                totalItems,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(totalItems / limit),
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error occurred while fetching books",
        });
    }

}