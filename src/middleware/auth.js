import jwt  from 'jsonwebtoken';

const authHandler = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        res.status(401).json({ error: 'Access denied' });
    }
    jwt.verify(token, process.env.TOKEN, (err, user) => {
        if(err){
            return res.status(403).json({ message: 'Invalid token' })
        }
        req.user = user;
        next();
    });
}

export { authHandler }