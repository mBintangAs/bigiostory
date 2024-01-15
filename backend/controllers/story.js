import { Category } from "../models/category.js";
import { Chapter } from "../models/chapter.js";
import { Story } from "../models/story.js"
import { Tag } from "../models/tag.js";
import { Op } from "sequelize";
import multer from 'multer';
import { storage } from "../app.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { unlink } from "fs/promises";

export const index = async (req, res) => {
  try {
    let whereClause = {}; // Persiapkan klausa WHERE kosong

    // Cek apakah ada parameter pencarian
    if (req.query.query) {
      const query = req.query.query;
      whereClause = {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { author: { [Op.like]: `%${query}%` } },
        ],
      };
    }

    // Cek apakah ada parameter kategori
    if (req.query.category) {
      whereClause.categoryId = req.query.category;
    }

    // Cek apakah ada parameter status
    if (req.query.status) {
      whereClause.status = req.query.status;
    }

    console.log(whereClause);
    const stories = await Story.findAll({
      attributes: ['title', 'author', 'id', 'status'],
      include: [
        { model: Category },
        { model: Tag },
      ],
      where: whereClause,
    });

    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const store = async (req, res) => {
  try {
    const upload = multer({ storage });
    // Gunakan 'upload.single' untuk menangani file upload
    upload.single('storyCover')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Multer Error' });
      } else if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const { title, author, synopsis, status, categoryId, tags } = req.body;
      const storyCover = req.file.filename; // Ambil nama file dari req.file

      const newStory = await Story.create({
        title,
        author,
        synopsis,
        storyCover,
        status,
        categoryId,
      });
      const parsedTags = JSON.parse(tags);

      if (tags && tags.length > 0) {
        const storyTags = parsedTags.map(tagName => ({ name: tagName, storyId: newStory.id }));
        await Tag.bulkCreate(storyTags);
      }

      return res.json({ message: 'Data berhasil disimpan' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const show = async (req, res) => {
  try {


    const stories = await Story.findOne({
      include: [
        { model: Category },
        { model: Tag },
      ],
      where: { title: req.params.title },
    });

    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const update = async (req, res) => {
  try {
    const { id, title, author, synopsis, storyCover, status, categoryId, tags } = req.body;

    const newStory = await Story.update({
      title,
      author,
      synopsis,
      storyCover,
      status,
      categoryId,
    }, { where: { id } });

    if (tags && tags.length > 0) {
      const storyTags = tags.map(tagName => ({ name: tagName, storyId: newStory.id }));
      await Tag.bulkCreate(storyTags, { updateOnDuplicate: ["name"] });
    }
    return res.json({ message: "Data berhasil diperbarui" })

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const destroy = async (req, res) => {
  try {
    const { id } = req.query;
    const story = await Story.findOne({ where: { id } })
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    await unlink(path.join(__dirname, '../images/', story.storyCover))
    await Chapter.destroy({ where: { storyId: id } });
    await Tag.destroy({ where: { storyId: id } })
    await story.destroy();
    // await Story.destroy({ where: { id } });
    return res.json({ message: "Data berhasil dihapus" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


