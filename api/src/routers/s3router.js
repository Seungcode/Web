import express from 'express';
import uploadRouter from '../util/s3.js';

export const s3Router = express.Router();

s3Router.post('/', uploadRouter.single('img'), (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
	res.json({ url: req.file.location });
});

