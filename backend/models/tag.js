import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const Tag = sequelize.define('Tag', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  storyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Stories',
      key: 'id',
    },
  },
});


export { Tag };
