import express from 'express';
import api from './routes/api';
import color from 'sscolors';

const app = express();


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/v1', api)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(color.animation.blinkslow(`Server is running on port ${color.green(String(port))}`));
});