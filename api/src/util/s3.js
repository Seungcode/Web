import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

var router = express.Router();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region:process.env.AWS_BUCKET_REGION,
});

const allowExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp']

const uploadRouter = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'honghee',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, callback) =>{
            const uploadDirectory = req.query.directory ?? ''
            const extension = path.extname(file.originalname)
            if (!allowExtensions.includes(extension)){
                return callback(new Error('wrong extension'))
            }
            callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`)
        },
        acl: 'public-read-write'
    }),
})

router.post('/', uploadRouter.single('img'), (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
	res.json({ url: req.file.location });
});

export default uploadRouter
