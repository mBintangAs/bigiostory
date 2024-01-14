// Category.js
import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}
);

// Definisikan relasi dengan model "Story" (one-to-many)

export { Category };
