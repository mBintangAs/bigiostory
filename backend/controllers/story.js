import { Category } from "../models/category.js";
import { Chapter } from "../models/chapter.js";
import { Story } from "../models/story.js"
import { Tag } from "../models/tag.js";
import { Op } from "sequelize";

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
    const { title, author, synopsis, storyCover, status, categoryId, tags } = req.body;

    const newStory = await Story.create({
      title,
      author,
      synopsis,
      storyCover,
      status,
      categoryId,
    });

    if (tags && tags.length > 0) {
      const storyTags = tags.map(tagName => ({ name: tagName, storyId: newStory.id }));
      await Tag.bulkCreate(storyTags);
    }
    return res.json({ message: "Data berhasil disimpan" })

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const update = async (req, res) => {
  try {
    const { title, author, synopsis, storyCover, status, categoryId, tags } = req.body;

    const newStory = await Story.update({
      title,
      author,
      synopsis,
      storyCover,
      status,
      categoryId,
    });

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
    const { categoryId } = req.body;
    await Chapter.destroy({ categoryId });
    await Story.destroy({ id: categoryId })
    return res.json({ message: "Data berhasil dihapus" })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });

  }
}


