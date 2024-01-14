import Express from 'express'
import 'dotenv/config'
import { storyRouter } from './routes/story.js'
import { sequelize } from './models/index.js'


const app = Express()

app.use(storyRouter)

app.listen(process.env.APP_PORT, () => {
    console.log(`Example app listening on port ${process.env.APP_PORT}`)
})
try {
    await sequelize.authenticate();
    // Definisikan relasi dengan model "Story" (many-to-one)
    // const story = Story;
    // const tag = Tag;
    // const chapter = Chapter;
    // const storyTag=StoryTag;
    // story.hasMany(chapter, { as: 'chapters' });
    // story.belongsToMany(tag, { through: 'StoryTag', as: 'tags' });
    // chapter.belongsTo(story, { foreignKey: 'storyId', as: 'story' });
    // tag.belongsToMany(story, { through: 'StoryTag', as: 'stories' });
   
    // await sequelize.sync({force:true});
} catch (error) {

}