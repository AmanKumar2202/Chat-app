import express from 'express';
import multer from 'multer';
import { transcribeAudio } from '../controllers/transcribe.controller.js';

const router = express.Router();

// Store uploaded files temporarily
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('audio'), transcribeAudio);

export default router;
