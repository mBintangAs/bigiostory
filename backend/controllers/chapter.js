import { Chapter } from "../models/chapter"

export const index = (req, res) => {
    try {
        const { storyId } = req.query
        const chapter = Chapter.findAll({ where: { storyId } });
        req.json(chapter)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export const show = (req, res) => {
    try {
        const { id } = req.query
        const chapter = Chapter.findOne({ where: { id } });
        req.json(chapter)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export const destroy = (req, res) => {
    try {
        const { id } = req.query
        const chapter = Chapter.destroy({ where: { id } });
        return res.json({ message: "Data berhasil dihapus" })

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
export const store = (req, res) => {
    try {
        const { storyId, title, storyChapter } = req.body
        const chapter = Chapter.create({ storyId, title, storyChapter });
        return res.json({ message: "Data berhasil ditambahkan" })

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
export const update = (req, res) => {
    try {
        const { storyId, title, storyChapter } = req.body
        const chapter = Chapter.update({ storyId, title, storyChapter });
        return res.json({ message: "Data berhasil diperbarui" })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
