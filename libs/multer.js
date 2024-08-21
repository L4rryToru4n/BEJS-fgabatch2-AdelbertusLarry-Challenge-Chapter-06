const multer = require('multer');
const path = require('path');

const generateStorage = (destination) => {
  // To be enhanced, add file chunkings for big size files
  // or size limits. This is meant to avoid timeouts
  return multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, path.join(__dirname, destination));
    },
    filename: function (req, file, callback) {
      callback(null, Date.now() + '-' + file.originalname);
    }
  })
}

const uploadImage = multer({
  storage: generateStorage('../public/images'),
  fileFilter: (req, file, callback) => {
    const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    }
    else {
      const err = new Error(`Only ${allowedMimeTypes.join(', ')} allowed to upload !`);
      callback(err, false);
    } 
  },
  onError: (err, next) => {
    next(err);
  }
});

const uploadVideo = multer({
  storage: generateStorage('../public/videos'),
  fileFilter: (req, file, callback) => {
    const allowedMimeTypes = ['video/mp4', 'video/x-msvideo', 'video/quicktime'];

    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    }
    else {
      const err = new Error(`Only ${allowedMimeTypes.join(', ')} allowed to upload !`);
      callback(err, false);
    }
  },
  onError: (err, next) => {
    next(err);
  }

});


const uploadMedia = multer({
  storage: generateStorage('../public/tmp'),
  fileFilter: (req, file, callback) => {
    const allowedMimeTypes = [
      'image/png', 'image/jpg', 'image/jpeg',
      'video/mp4', 'video/x-msvideo', 'video/quicktime'
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    }
    else {
      const err = new Error(`Only ${allowedMimeTypes.join(', ')} allowed to upload !`);
      callback(err, false);
    }
  },
  onError: (err, next) => {
    next(err);
  }

});

const uploadCloud = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB
  },
  fileFilter: (req, file, callback) => {
    const allowedMimeTypes = [
      'image/png', 'image/jpg', 'image/jpeg',
      'video/mp4', 'video/x-msvideo', 'video/quicktime'
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    }
    else {
      const err = new Error(`Only ${allowedMimeTypes.join(', ')} allowed to upload !`);
      callback(err, false);
    }
  },
  onError: (err, next) => {
    next(err);
  }
});

module.exports = {
  uploadImage,
  uploadVideo,
  uploadMedia,
  uploadCloud
};