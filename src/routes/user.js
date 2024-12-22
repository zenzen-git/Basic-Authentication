import express from 'express';

const userRouter = express.Router();

userRouter.get('/',(req, res) => {
    res.status(200).json({id: 'id', name: 'Jhoanna', age: '22'});
})

userRouter.get('/:id',(req, res, next) => {
    const error = new Error('This error message will be passed to the error middleware');
    error.status = 404;
    return next(error);
})

export default userRouter;