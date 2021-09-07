const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// connect to s3 bucket 
const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_BUCKET_REGION
});

// use multer to upload
    // setting filter fuction for multer
    const multerFilter = (req, file ,cb ) => {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null,true)
        } else {
            cb(null, false)
        }
    }
    // setting storage option for multer
    const storage = multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, `pearMo/image/${Date.now().toString()}`);
        }  
    });

    const fileSize = process.env.IMAGE_LIMIT;

const upload = multer({
    storage: storage,
    fileFilter: multerFilter,
    limits: {
        fileSize: fileSize
    }
});

// for using middleware upload.single('fieldname')
// after execution of middleware it will have field in req.file.location

module.exports = upload;