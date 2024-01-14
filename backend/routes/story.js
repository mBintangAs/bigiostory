import Express from "express";
import { index } from "../controllers/story.js";
const router  = Express.Router();

router.get('/story',index)
export {router as storyRouter }