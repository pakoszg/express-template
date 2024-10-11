import express from 'express';
import createUser from '../https/user/createUser.f';
import { asyncHandler } from '../handlers';
import getUser from '../https/user/getUsers.f';

const router = express.Router();

router.post('/create', asyncHandler(createUser));
router.get('/:id?', asyncHandler(getUser));

export default router;
