import express from 'express';
import authRoute from './auth.routes';
import postRoute from './post.routes';
import tagRoute from './tag.routes';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/posts', postRoute);
router.use('/tags', tagRoute)

export default router;