import express from "express"
import { activeCategory, createCategory, getAllCategories, getCategoryById, updateCategory } from "../../controller/admin/categoryController.js"



const router = express.Router()

router.post("/create", createCategory)
router.get("/", getAllCategories)
router.get("/:id", getCategoryById)
router.put("/update/:id", updateCategory)
router.put("/soft-delete/:id", activeCategory)
export default router