import express from 'express';
import jwt from 'jsonwebtoken';
import { authHandler } from '../middleware/auth';

const apiRouter = express.Router();

apiRouter.get('/friends', authHandler, (req, res) => {
    res.status('200').json({ friend: [] });
});

apiRouter.get('/refresh-token', (req, res) => {
    const refreshToken = req.cookies.refresh_token;
    if(!refreshToken){
        return res.json({ error: 'Refresh Token required'});
    };
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
        if(err){
            return res.json({ error: 'Refresh Token required'});
        }
        req.user = user;
    });
});