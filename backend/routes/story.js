import Express from "express";
import {  index, show, store, update } from "../controllers/story.js";
const router = Express.Router();

router.get('/story', index);
router.get('/story/:title', show);
router.post('/story', store);
router.post('/story-edit', update);
export { router as storyRouter }