import Express from "express";
import { index } from "../controllers/category.js";
const router = Express.Router();

router.get('/category', index);
export { router as categoryRouter }