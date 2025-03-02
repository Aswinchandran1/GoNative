const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `image-${Date.now()}-${file.originalname}`);
    }
});

// ✅ Correct export: Make sure multer is configured properly
const multerMiddleware = multer({ storage });

module.exports = multerMiddleware;
