import slugify from "slugify"
import Category from "../../models/Category.js"
import mongoose from "mongoose"
export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body
        if (!name) {
            return res.status(404).json({ message: "Mising fields" })
        }
        const slug = slugify(name, {
            lower: true,
            strict: true
        })

        const isExistSlug = await Category.findOne({ slug })
        if (isExistSlug) {
            return res.status(409).json({
                message: "Category already exists",
            });
        }
        const category = await Category.create({
            name,
            description,
            slug
        })

        return res.status(201).json({
            message: "Category created successfully",
            data: category,
        });

    } catch (error) {
        console.error("Create category error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid category id",
            });
        }
        const category = await Category.findById(id)
        if (!category) {
            return res.status(404).json({
                message: "Category not found",
            });
        }
        return res.status(200).json({
            message: "Category found successfully",
            data: category,
        });
    } catch (error) {
        console.error("Get category by id error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

export const getAllCategories = async (req, res) => {
    try {
        let {
            page = "1",
            limit = "10",
            search = "",
            isActive = "true",

        } = req.query

        const filter = {}
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ]
        }

        if (isActive !== undefined) {
            filter.isActive = isActive === 'true';
        }

        const currentPage = parseInt(page)
        const limitNum = parseInt(limit)
        const skip = (currentPage - 1) * limitNum

        const [categories, totalItems] = await Promise.all([
            Category.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
            Category.countDocuments(filter)
        ])

        const totalPage = Math.ceil(totalItems / limit)
        return res.status(200).json({
            data: categories,
            meta: {
                page,
                limit,
                totalPage,
                totalItems
            }
        })
    } catch (error) {
        console.error("Get categories error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid category id",
            });
        }
        const category = await Category.findById(id)
        if (!category) {
            return res.status(404).json({
                message: "Category not found",
            });
        }
        const { name, description, isActive } = req.body
        const updateData = {}

        if (name) {
            const existedCategory = await Category.findOne({
                name: name.trim(),
                _id: { $ne: id }
            })
            if (existedCategory) {
                return res.status(400).json({
                    message: "Category name already exists",
                });
            }
        }

        if (name) {
            updateData.name = name.trim()
            updateData.slug = slugify(name, {
                lower: true,
                strict: true,
                trim: true
            })
        }
        if (description) {
            updateData.description = description
        }
        if (isActive) {
            updateData.isActive = isActive
        }

        const newCategory = await Category.findByIdAndUpdate(id, updateData, { new: true })

        return res.status(200).json({
            message: "Update category successfully",
            data: newCategory,
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error at update Category",
        });
    }
}

export const activeCategory = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid category id",
            });
        }
        const category = await Category.findById(id)

        if (!category) {
            return res.status(404).json({
                message: "Category not found",
            });
        }

        if (category.isActive === false) {
            return res.status(400).json({
                message: "Category already inactive",
            });
        }

        category.isActive = false
        await category.save()
        return res.status(200).json({
            message: "Category soft deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error at soft delete category",
        });
    }
}
