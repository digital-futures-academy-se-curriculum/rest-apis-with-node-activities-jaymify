import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import FS from 'fs';
import mongoose from 'mongoose';
import HTTPS from 'https';

import { router as allFilms } from './routes/allFilms.js';
import { router as makeBooking } from './routes/makeBooking.js';
import { router as openingTimes } from './routes/openingTimes.js';
import { router as signup } from './routes/signup.js';
import { router as singleFilm } from './routes/singleFilm.js';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(`/allFilms`, allFilms);
app.use(`/openingTimes`, openingTimes);
app.use(`/singleFilm`, singleFilm);
app.use(`/makeBooking`, makeBooking);
app.use(`/signup`, signup);
app.use((req, res) => res.status(404).send(`Sorry that reel can't be found`));

const main = async () => {
  console.log(`Connecting to: ${process.env.DB_URI}`);
  await mongoose.connect(process.env.DB_URI);
}

main().then(`Connected to database`).catch(error => console.log(error));

const httpsOptions = {
  key: FS.readFileSync(`server.key`),
  cert: FS.readFileSync(`server.cert`)
};

const server = HTTPS.createServer(httpsOptions, app).listen(process.env.PORT, () => {
  const SERVERHOST = server.address().address;
  const SERVERPORT = server.address().port;
  console.log(`Server is running on https://${SERVERHOST}:${SERVERPORT}`);
});

export default server;
