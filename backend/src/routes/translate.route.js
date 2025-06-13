
import express from 'express';
import { translateMessage } from '../controllers/translate.controller.js';

const router = express.Router();

router.post('/', translateMessage);

export default router;
