const { Prisma } = require('@prisma/client');
const USERS = require('../models/users.model');
const MEDIAS = require('../models/medias.model');
const imagekit = require('../config/imagekitconf');
const qr = require('node-qr-image');
const path = require('path');
const fs = require('fs');


async function getUsers(req, res) {
  try {
    let user = await USERS.getUsers();

    const data = JSON.stringify(user, (key, value) =>
      typeof value === "bigint" ? value.toString() + "n" : value
    );

    const temp = JSON.parse(data);

    const result = {
      "status": true,
      "data": temp
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(404).json({
      "status": false,
      "message": "Failed to get users."
    });
  }
}

async function getUser(req, res) {
  try {
    const user_id = req.params.id;
    let user = await USERS.getUser(user_id);

    const data = JSON.stringify(user, (key, value) =>
      typeof value === "bigint" ? value.toString() + "n" : value
    );

    const temp = JSON.parse(data);

    const result = {
      "status": true,
      "data": temp
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(404).json({
      "status": false,
      "message": "No user has been found."
    });
  }
}

async function createUser(req, res) {
  try {
    const body = req.body;
    let user = await USERS.createUser(body);

    const data = JSON.stringify(user, (key, value) =>
      typeof value === "bigint" ? value.toString() + "n" : value
    );

    const temp = JSON.parse(data);

    const result = {
      "status": true,
      "data": temp
    }

    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({
      "status": false,
      "message": "Create user failed. Please complete your data request."
    });
  }
}

async function getProfileMedias(req, res) {
  try {
    const user_id = req.params.user_id;
    let media = await MEDIAS.getMedias(user_id);

    const data = JSON.stringify(media, (key, value) =>
      typeof value === "bigint" ? value.toString() + "n" : value
    );

    const temp = JSON.parse(data);

    const result = {
      "status": true,
      "data": temp
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(404).json({
      "status": false,
      "message": "No user or medias have been found."
    });
  }
}

async function getProfileMediaDetail(req, res) {
  try {
    const user_id = req.params.user_id;
    const id = req.params.id;
    let media = await MEDIAS.getMedia(user_id, id);

    const file_Id = media.imagekit_fileId;
    
    const imagekit_filedetails = await imagekit.getFileDetails(`${file_Id}`);

    const result = {
      status: true,
      data: imagekit_filedetails
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(404).json({
      "status": false,
      "message": "No user has been found or media have been found"
    });
  }
}

async function updateProfileMedia(req, res) {
  try {
    const user_id = req.params.user_id;
    const id = req.params.id
    const body = req.body;
    let media = await MEDIAS.updateMedia(user_id, id, body);

    const data = JSON.stringify(media, (key, value) =>
      typeof value === "bigint" ? value.toString() + "n" : value
    );

    const temp = JSON.parse(data);

    const result = {
      "status": true,
      "data": temp
    }

    return res.status(200).json(result);
  }
  catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        return res.status(404).json({
          status: false,
          message: "No such user or media has been found."
        });
      }
      return res.status(400).json({
        status: false,
        message: `Update media failed. ${err.message}`
      });
    }
  }
}

async function uploadProfilePicture(req, res) {
  try {
    const body = req.body;
    const user_id = req.params.id
    body.image_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    let user = await USERS.updateUser(user_id, body);

    const data = JSON.stringify(user, (key, value) =>
      typeof value === "bigint" ? value.toString() + "n" : value
    );

    const temp = JSON.parse(data);

    const result = {
      "status": true,
      "data": temp
    }

    return res.status(200).json(result);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        return res.status(404).json({
          "status": false,
          "message": "No such user has been found."
        });
      }
      return res.status(400).json({
        "status": false,
        "message": "Update user failed. Please complete your data request."
      });
    }
  }
}

async function uploadProfileVideo(req, res) {
  try {
    const body = req.body;
    const user_id = req.params.id
    body.video_url = `${req.protocol}://${req.get('host')}/videos/${req.file.filename}`;

    let user = await USERS.updateUser(user_id, body);

    const data = JSON.stringify(user, (key, value) =>
      typeof value === "bigint" ? value.toString() + "n" : value
    );

    const temp = JSON.parse(data);

    const result = {
      "status": true,
      "data": temp
    }

    return res.status(200).json(result);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        return res.status(404).json({
          "status": false,
          "message": "No such user has been found."
        });
      }
      return res.status(400).json({
        "status": false,
        "message": "Update user failed. Please complete your data request."
      });
    }
  }
}

async function moveProfileMediaFiles(req) {

  try {

    const image_name = req.files.image[0].filename;
    const video_name = req.files.video[0].filename;

    const source_image = path.join(__dirname, '../public/tmp/' + image_name);
    const source_video = path.join(__dirname, '../public/tmp/' + video_name);
    const target_image = path.join(__dirname, '../public/images/' + image_name);
    const target_video = path.join(__dirname, '../public/videos/' + video_name);

    fs.rename(source_image, target_image, (err) => {
      if (err) {
        throw err;
      }
    });
    fs.rename(source_video, target_video, (err) => {
      if (err) {
        throw err;
      }
    });

    console.log('Files moved successfully !');
  }
  catch (err) {
    console.error(err);
  }
}

async function uploadProfileMedia(req, res) {

  try {
    
    moveProfileMediaFiles(req);

    const body = req.body;
    const user_id = req.params.id
    const image_name = req.files.image[0].filename;
    const video_name = req.files.video[0].filename;

    body.image_url = `${req.protocol}://${req.get('host')}/images/${image_name}`;
    body.video_url = `${req.protocol}://${req.get('host')}/videos/${video_name}`;

    let user = await USERS.updateUser(user_id, body);

    const data = JSON.stringify(user, (key, value) =>
      typeof value === "bigint" ? value.toString() + "n" : value
    );

    const temp = JSON.parse(data);

    const result = {
      "status": true,
      "data": temp
    }

    return res.status(200).json(result);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        return res.status(404).json({
          "status": false,
          "message": "No such user has been found."
        });
      }
      return res.status(400).json({
        "status": false,
        "message": "Update user failed. Please complete your data request."
      });
    }
  }
}

async function deleteProfileMediaFiles(req) {

  try {

    const image_name = req.files.image[0].filename;
    const video_name = req.files.video[0].filename;

    const source_image = path.join(__dirname, '../public/tmp/' + image_name);
    const source_video = path.join(__dirname, '../public/tmp/' + video_name);

    fs.unlink(source_image, (err) => {
      if (err) {
        throw err;
      }
    });
    fs.unlink(source_video, (err) => {
      if (err) {
        throw err;
      }
    });

    console.log('Files removed successfully !');
  }
  catch (err) {
    console.error(err);
  }
}

async function deleteProfileMedia(req, res) {
  try {

    deleteProfileMediaFiles(req);

    const body = req.body;
    const user_id = req.params.id

    body.image_url = null;
    body.image_title = null;
    body.image_description = null;
    body.video_url = null;
    body.video_title = null;
    body.video_description = null;

    await USERS.updateUser(user_id, body);

    const result = {
      status: true,
      message: "Image and video deleted successfully."
    }

    return res.status(200).json(result);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        return res.status(404).json({
          "status": false,
          "message": "No such user has been found."
        });
      }
      return res.status(400).json({
        "status": false,
        "message": "Update user failed. Please complete your data request."
      });
    }
  }
}

async function uploadMediaToCloud(req, res) {
  try {
    const stringFile = req.file.buffer.toString('base64');
    const uploadFile = await imagekit.upload({
      fileName: req.file.originalname,
      folder: '/users-assets',
      tags: ["users-media"],
      file: stringFile,
      transformation: {
        pre: 'l-text,i-Imagekit,fs-50,l-end',
        post: [
          {
            type: 'transformation',
            value: 'h-100,w-100'
          }
        ]
      }
    });

    const body = req.body;
    const user_id = req.params.user_id;
    body.imagekit_fileId = uploadFile.fileId;
    body.type = uploadFile.fileType;
    body.url = uploadFile.url;

    await MEDIAS.uploadMedia(user_id, body);

    return res.status(201).json({
      status: true,
      message: "success",
      data: {
        imagekit_fileId: uploadFile.fileId,
        filename: uploadFile.name,
        title: body.title,
        description: body.description,
        url: uploadFile.url,
        type: uploadFile.fileType
      }
    });
  }
  catch (err) {
    console.error(err);

    return res.status(400).json({
      status: false,
      message: `Cloud upload failed. ${err.message}`
    });
  }
}

async function deleteMediaInCloud (req, res) {
  try {
    const user_id = req.params.user_id;
    const id = req.params.id;

    const imagekit_media_detail = await MEDIAS.getMedia(user_id, id);
    const imagekit_fileId = imagekit_media_detail.imagekit_fileId;
    const imagekit_full_url = imagekit_media_detail.url;
    
    const imagekit_file_details = await imagekit.getFileDetails(`${imagekit_fileId}`);
    
    await MEDIAS.deleteMedia(user_id, id);
    await imagekit.deleteFile(`${imagekit_fileId}`);
    await imagekit.purgeCache(`${imagekit_full_url}`);

    return res.status(200).json({
      status: true,
      message: "Deletion successful",
      data: {
        url: imagekit_media_detail.url,
        filename: imagekit_file_details.name,
        mime_type: imagekit_file_details.mime
      }
    });
  }
  catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        return res.status(404).json({
          "status": false,
          "message": "No such media has been found."
        });
      }
      console.error(err);
      return res.status(400).json({
        status: false,
        message: `Cloud upload failed. ${err.message}`
      });
    }
  }
}

async function qrGenerator(req, res) {
  
  try {
    let keyword = req.params.keyword;
    // let qr_svg = qr.image(`https://www.google.com/search?q=${keyword}`, { type: 'png' });
    // qr_svg.pipe(fs.createWriteStream(`./public/images/qr_google_search_for_${keyword}.png`));

    // Using buffer type A
    let svg_string = qr.imageSync(`https://www.google.com/search?q=${keyword}`, { type: 'png', size: 4 });

    // Respond buffer type A with a QR image
    // res.writeHead(200, {
    //   'Content-Type': 'image/png',
    //   'Content-Length': svg_string.length
    // });

    // res.end(svg_string);

  
    const stringFile = svg_string.toString('base64');
    const uploadFile = await imagekit.upload({
      fileName: `qr_google_search_for_${keyword}.png`,
      folder: '/users-assets',
      tags: ["users-media"],
      file: stringFile
    });
  
    
    return res.json({
      status: true,
      message: "success",
      data: {
        name: uploadFile.name,
        url: uploadFile.url,
        type: uploadFile.fileType
      }
    });
  }
  catch (err) {
    console.error(err);

    return res.status(400).json({
      status: false,
      message: `Cloud upload failed. ${err.message}`
    });
  }

  // Upload the buffer image to the ImageKit

  // Using buffer type B
  // let chunks = [];
  
  // let value_qr = {
  //   name: "qrtest",
  //   value: 100,
  //   keyword: keyword
  // };

  // const qrStream = qr.image(JSON.stringify(value_qr), { type: 'png' });

  // qrStream.on('data', (chunk) => {
  //   chunks.push(chunk);
  // });

  // qrStream.on('end', () => {
  //   const buffer = Buffer.concat(chunks);

  //   console.log(buffer);
  //   res.writeHead(200, {
  //     'Content-Type': 'image/png',
  //     'Content-Length': buffer.length
  //   });

  //   res.end(buffer);
  // })

  // JSON response, no QR image
  // res.json({
  //   status: true,
  //   message: "QR Generation successfull !",
  //   data: `qr-ticket${id}.png`
  // });

  // Response with an image
  // res.type('png');
  // qr_svg.pipe(res);
  
}

module.exports = {
  uploadProfilePicture,
  uploadProfileVideo,
  getProfileMedias,
  getProfileMediaDetail,
  updateProfileMedia,
  uploadProfileMedia,
  deleteProfileMedia,
  uploadMediaToCloud,
  deleteMediaInCloud,
  qrGenerator,
  getUsers,
  getUser,
  createUser
};