import express from 'express';
import { createUser, getUsers } from '../controller/userController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);

export default router;
