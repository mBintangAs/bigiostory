import Express from "express";
import { index, store } from "../controllers/story.js";
const router = Express.Router();

router.get('/story', index)
router.post('/story', store)
router.put('/story', index)
router.delete('/story', destroy)
export { router as storyRouter }