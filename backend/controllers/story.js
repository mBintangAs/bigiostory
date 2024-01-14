import { Story } from "../models/story.js"

export const index = async (req, res) => {
    const story = Story.findAll({
        attributes: ['name']
      });
        res.send("halo")
}