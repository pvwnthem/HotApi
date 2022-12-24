import express from 'express';
import api from './routes/api';

const app = express();


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/v1', api)