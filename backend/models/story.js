import { DataTypes } from 'sequelize';
import { sequelize } from './index.js'; // Sesuaikan dengan instance Sequelize Anda

const Story = sequelize.define('Story', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
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
        type: DataTypes.STRING, 
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
