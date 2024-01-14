import Express from 'express'
import 'dotenv/config'
import { storyRouter } from './routes/story.js'
import { sequelize } from './models/index.js'
import { Story } from './models/story.js'
import { Tag } from './models/tag.js'
import { Chapter } from './models/chapter.js'
import { Category } from './models/category.js'


const app = Express()

app.use(storyRouter)

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

}