import express from 'express';
import { authHandler } from '../middleware/auth';

const apiRouter = express.Router();

apiRouter.get('/friends', authHandler, (req, res) => {
    res.status('200').json({ friend: [] });
});