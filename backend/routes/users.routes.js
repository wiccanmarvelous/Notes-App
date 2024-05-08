import express from 'express';
import { getAllUsers, searchOneUser, searchUser } from '../controllers/users.controller.js';
import protectRoutes from '../middleware/protectRoutes.js';

const router = new express.Router();

router.get('/searchUser/:username', searchUser);
router.get('/searchOneUser/:username', searchOneUser);
router.get('/getAllUsers', protectRoutes, getAllUsers);

export default router;