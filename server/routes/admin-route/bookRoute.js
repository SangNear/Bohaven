import express from "express"
import { createBook, deleteBook, getListBook, updateBook, uploadImages } from "../../controller/admin/bookController.js"

import upload from "../../middleware/upload.js"


const router = express.Router()

router.get("/", getListBook)
router.post("/create", createBook)
router.post("/upload", upload.array("images", 5), uploadImages)
router.put("/update/:id", updateBook)
router.put("/delete/:id", deleteBook)
export default router