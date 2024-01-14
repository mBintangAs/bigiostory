import { Chapter } from "../models/chapter.js"

export const index = async (req, res) => {
    try {
        const { storyId } = req.query
        const chapter = await Chapter.findAll({ where: { storyId } });
        return res.json(chapter)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export const show = async (req, res) => {
    try {
        const { id } = req.query
        const chapter = await Chapter.findOne({ where: { id } });
        res.json(chapter)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export const destroy = async (req, res) => {
    try {
        const { id } = req.body
        console.log(id);
        const chapter = await Chapter.destroy({ where: { id } });
        return res.json({ message: "Data berhasil dihapus" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
export const store = async (req, res) => {
    try {
        const { storyId, title, storyChapter } = req.body
        const chapter = await Chapter.create({ storyId, title, storyChapter });
        return res.json({ message: "Data berhasil ditambahkan" })

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
export const update = async (req, res) => {
    try {
        const { storyId, title, storyChapter } = req.body
        const chapter = await Chapter.update({ storyId, title, storyChapter }, { where: { storyId } });
        return res.json({ message: "Data berhasil diperbarui" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
