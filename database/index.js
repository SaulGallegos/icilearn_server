import { Sequelize } from 'sequelize';

export const db = new Sequelize('icilearn', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

export const connectDb = async () => {
  try {
    await db.authenticate();
    console.log('Database connected');
  } catch (e) {
    console.log(e);
  }
};
