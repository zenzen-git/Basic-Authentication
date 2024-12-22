import express from 'express';
import jwt from 'jsonwebtoken';

const AuthRouter = express.Router();

AuthRouter.post('/register', async (req, res) => {
    try{
        const { email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        res.status(201).json({error: 'Registration success'})
    } catch(err){
        res.status(500).json({ error: 'Registration error' })
    }
});

AuthRouter.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;
        const matchPassword = await bcrypt.compare(password, password);
        if(!matchPassword){
            return res.status(401).json({ error: 'Authentication failed' });
        }

        const accessToken = jwt.sign({ userId: 'SampleUserId', email}, process.env.SECRET_KEY, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ userId: 'SampleUserId', email}, process.env.REFRESH_TOKEN_KEY, { expiresIn: '1d' });

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000
        });

        res.cookie('refreh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ 
            message: 'Login Success',
            user: { userId: 'sampleUserId' }
        });
    } catch(err){
        res.status(500).json({ error: 'Login failed' })
    }
});

export { AuthRouter };