import express from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(process.env.PORT, () => {
    console.log(`Port ${process.env.PORT} is listening...`)
});