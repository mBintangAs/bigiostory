import { Category } from "../models/category.js";
import { Story } from "../models/story.js"
import { Tag } from "../models/tag.js";
import { Op } from "sequelize";
import multer from 'multer';
import { storage } from "../app.js";

export const index = async (req, res) => {
  try {
    let whereClause = {}; 
    if (req.query.query) {
      const query = req.query.query;
      whereClause = {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { author: { [Op.like]: `%${query}%` } },
        ],
      };
    }

    if (req.query.category) {
      whereClause.categoryId = req.query.category;
    }

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
    upload.single('storyCover')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Multer Error' });
      } else if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const { title, author, synopsis, status, categoryId, tags } = req.body;
      const storyCover = req.file.filename;
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
    const upload = multer({ storage });
    upload.single('storyCover')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Multer Error' });
      } else if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const { title, author, synopsis, status, categoryId, tags } = req.body;

      const story = await Story.findOne({ where: { title } });
      const storyCover = req.file ? req.file.filename : story.storyCover;

      const newStory = await Story.update({
        title,
        author,
        synopsis,
        storyCover,
        status,
        categoryId,
      }, { where: { title } });

      const parsedTags = JSON.parse(tags);
      console.log(parsedTags);
      if (tags && tags.length > 0) {
        await Tag.destroy({ where: { storyId: story.id } })
        const storyTags = parsedTags.map(tagName => ({ name: tagName, storyId: story.id }));
        await Tag.bulkCreate(storyTags);
      }

      return res.json({ message: "Data berhasil diperbarui" })
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



