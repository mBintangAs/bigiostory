// story.js
import { DataTypes } from 'sequelize';
import { sequelize } from './index.js'; // Sesuaikan dengan instance Sequelize Anda
import { Chapter } from './chapter.js';
import { Tag } from './tag.js';

const Story = sequelize.define('Story', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    synopsis: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
  
    storyCover: {
        type: DataTypes.STRING, // Gunakan tipe data yang sesuai untuk menyimpan path/gambar
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'Categories',
            key: 'id',
        },
    },
}, {
    modelName: 'Story',
});

export { Story };
