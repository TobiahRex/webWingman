import express from 'express';
import things from './things';
import users from './users';

const router = new express.Router();

router.use('/things', things);
router.use('/users', users);

export default router;
