import { Category } from "../models/category.js";
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

    res.status(200).json({ success: true, data: stories });
  } catch (error) {
    console.error('Error during index:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};



