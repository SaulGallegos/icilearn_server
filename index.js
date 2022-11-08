import express from 'express';
const morgan = require('morgan');
import fs from 'fs';
import cors from 'cors';

import { connectDb } from './database/index';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

fs.readdirSync('./routes').map(routeName =>
  app.use(
    `/api/${routeName.split('.')[0]}`,
    require(`./routes/${routeName}`).default
  )
);

app.listen(port, () => {
  console.log(`Server Port: ${port}`);
});

connectDb();
