import Express from "express";
import { destroy, index, store, update } from "../controllers/chapter.js";
const router = Express.Router();

router.get('/chapter', index);
router.post('/chapter', store);
router.put('/chapter', update);
router.delete('/chapter', destroy);
export { router as chapterRouter }