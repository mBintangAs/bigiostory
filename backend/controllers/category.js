import { Category } from "../models/category.js";

export const index = async (req,res)=>{
    try {
        const category = await Category.findAll();
        return res.json(category)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}