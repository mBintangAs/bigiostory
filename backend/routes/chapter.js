import Express from "express";
import { destroy, index, show, store, update } from "../controllers/chapter.js";
const router = Express.Router();

router.get('/chapter', index);
router.get('/chapter/:id', show);
router.post('/chapter', store);
router.post('/chapter-edit', update);
router.delete('/chapter', destroy);
export { router as chapterRouter }