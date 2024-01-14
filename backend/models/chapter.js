// chapter.js
import { DataTypes } from 'sequelize';
import { sequelize } from './index.js'; // Sesuaikan dengan instance Sequelize Anda

const Chapter = sequelize.define('Chapter', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    storyChapter: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    // Menambahkan foreign key untuk merujuk ke model "Story"
    storyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Stories',
            key: 'id',
        },
    },
}, {
    modelName: 'Chapter',
});

export { Chapter };
