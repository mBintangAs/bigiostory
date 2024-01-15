import Express from 'express'
import 'dotenv/config'
import { storyRouter } from './routes/story.js'
import { sequelize } from './models/index.js'
import { Story } from './models/story.js'
import { Tag } from './models/tag.js'
import { Chapter } from './models/chapter.js'
import { Category } from './models/category.js'
import { chapterRouter } from './routes/chapter.js'
import { categoryRouter } from './routes/category.js'
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';


const app = Express()
app.use(cors());

app.use(bodyParser.json());
export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./images');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
  });

app.use(storyRouter)
app.use(chapterRouter)
app.use(categoryRouter)
app.use('/images',Express.static('images'))


app.listen(process.env.APP_PORT, () => {
    console.log(`Example app listening on port ${process.env.APP_PORT}`)
})
try {
    await sequelize.authenticate();
    Category.hasMany(Story)
    Story.belongsTo(Category)
    Story.hasMany(Tag)
    Tag.belongsTo(Story)
} catch (error) {
    console.error(error)
}