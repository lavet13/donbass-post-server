import { db } from './app/models/index.js';
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize
  .sync({ force: true })
  .then(() => console.log('re-sync db'))
  .catch(err => console.log(err));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome' });
});

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
