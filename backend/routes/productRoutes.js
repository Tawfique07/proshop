import express from "express";
import {
    createProduct,
    createProductReview,
    deleteProduct,
    getProductById,
    getProducts,
    getTopProducts,
    updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/top").get(getTopProducts);
router
    .route("/:id")
    .get(checkObjectId, getProductById)
    .put(checkObjectId, protect, admin, updateProduct)
    .delete(checkObjectId, protect, admin, deleteProduct);
router.route("/:id/reviews").post(protect, checkObjectId, createProductReview);

export default router;
