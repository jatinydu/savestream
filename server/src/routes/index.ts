import express from 'express';
import authRoute from './auth.routes';
import postRoute from './post.routes';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/posts', postRoute);

export default router;