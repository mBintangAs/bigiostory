import { sequelize } from "../index.js";
import { Category } from "../category.js";
import { Story } from "../story.js";
import { Tag } from "../tag.js";
import { Chapter } from "../chapter.js";
// await sequelize.sync({ force: true });
// await Category.sync({ force: true });
// await Story.sync({ force: true });
// await Tag.sync({ force: true });
// await Chapter.sync({ force: true });

let cat = ['Financial', 'Technology', 'Health']
cat.map(async (name) => { await Category.create({ name }) })
console.log('All models were synchronized successfully.');
