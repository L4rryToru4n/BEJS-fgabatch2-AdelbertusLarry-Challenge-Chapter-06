var express = require('express');
var router = express.Router();
const user = require('../../../controllers/users.controller');
const storage = require('../../../libs/multer');

/* GET media listing. */
router.get('/', function (req, res, next) {
  res.send('media respond with a resource');
});

const cpUpload = storage.uploadMedia.fields(
  [
    {
      name: 'image',
      maxCount: 1
    },
    {
      name: 'video',
      maxCount: 1
    }
  ]
);

router.post('/images/:id', storage.uploadImage.single('file'), user.uploadProfilePicture);
router.post('/videos/:id', storage.uploadVideo.single('file'), user.uploadProfileVideo);
router.post('/medias/:id', cpUpload, user.uploadProfileMedia);
router.post('/imagekit', storage.uploadCloud.single('image'), user.uploadProfileMediaToCloud);
router.get('/qr/:keyword', user.qrGenerator);

module.exports = router;
