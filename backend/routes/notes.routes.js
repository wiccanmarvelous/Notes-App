import express from 'express';

import { getCards, setCards, delCard, editCard } from '../controllers/notes.controller.js';

const router =  express.Router();

router.post('/cards/set', setCards);
router.post('/cards/get', getCards);
router.patch('/cards/edit/:id', editCard);
router.delete('/cards/del/:id', delCard);

export default router;