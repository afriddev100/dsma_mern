import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'backend/files/'); // Specify a folder for all uploads
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Define a file filter for allowed file types
function fileFilter(req, file, cb) {
  // Define allowed file extensions and MIME types
  const filetypes = /jpe?g|png|webp|pdf|xls|xlsx|doc|docx|txt|json/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp|application\/pdf|application\/vnd.openxmlformats-officedocument.wordprocessingml.document|application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet|text\/plain|application\/json/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only images and PDF, Excel, DOC, TXT, and JSON files are allowed!'), false);
  }
}

// Initialize multer with storage and file filter
const upload = multer({ storage, fileFilter });

// Define a route for uploading files
const uploadSingleFile = upload.single('file'); // 'file' should match the name of your input field

router.post('/', (req, res) => {
  uploadSingleFile(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    res.status(200).send({
      message: 'File uploaded successfully',
      file: `/${req.file.filename}`,
    });
  });
});

export default router;
