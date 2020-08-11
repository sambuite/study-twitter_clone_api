import { Sequelize } from 'sequelize';
import path from 'path';

const db = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, 'db.sqlite'),
  define: {
    timestamps: true,
    underscored: true,
  },
});

export default db;
