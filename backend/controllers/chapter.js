import { Chapter } from "../models/chapter.js"
import { Story } from "../models/story.js";

export const index = async (req, res) => {
    try {
        const { judul } = req.query
        const story = await Story.findOne({ where: { title: judul } })
        const chapter = await Chapter.findAll({ where: { storyId: story.id } });
        return res.json(chapter)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export const show = async (req, res) => {
    try {
        const { id } = req.params
        const chapter = await Chapter.findOne({ where: { id } });
        res.json(chapter)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export const destroy = async (req, res) => {
    try {
        const { id } = req.query
        const chapter = await Chapter.destroy({ where: { id } });
        return res.json({ message: "Data berhasil dihapus" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
export const store = async (req, res) => {
    try {
        const { title, storyChapter, judul } = req.body
        const storyId = await Story.findOne({ where: { title: judul } })
        const chapter = await Chapter.create({ storyId: storyId.id, title, storyChapter });
        return res.json({ message: "Data berhasil ditambahkan" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
export const update = async (req, res) => {
    try {
        const { judul, title, storyChapter } = req.body
        const story = await Story.findOne({ where: { title: judul } })
        const chapter = await Chapter.update({ title, storyChapter }, { where: { storyId: story.id } });
        return res.json({ message: "Data berhasil diperbarui" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
