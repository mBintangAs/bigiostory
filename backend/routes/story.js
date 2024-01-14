import Express from "express";
import { destroy, index, store, update } from "../controllers/story.js";
const router = Express.Router();

router.get('/story', index);
router.post('/story', store);
router.put('/story', update);
router.delete('/story', destroy);
export { router as storyRouter }