const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const imagekit = require("../libs/imagekit");
const path = require("path");

module.exports = {
  uploadImage: async (req, res, next) => {
    try {
      const { judul, deskripsi } = req.body;
      let strFile = req.file.buffer.toString("base64");
      if (!judul || !deskripsi) {
        return res.status(400).json({
          status: false,
          message: "Bad Request",
          err: "judul Or deskripsi Not Exist",
          data: null,
        });
      }
      let imgpload = await imagekit.upload({
        fileName: Date.now() + path.extname(req.file.originalname),
        file: strFile,
      });
      let imageGalery = await prisma.imageGalery.create({
        data: {
          judul,
          deskripsi,
          url_picture: imgpload.url,
          file_id: imgpload.fileId,
        },
      });
      return res.status(201).json({
        status: true,
        message: "OK",
        error: null,
        data: imageGalery,
      });
    } catch (err) {
      next(err);
    }
  },
  getAllImage: async (req, res, next) => {
    try {
      let allImage = await prisma.imageGalery.findMany();
      res.status(200).json({
        status: true,
        message: "OK",
        error: null,
        data: allImage,
      });
    } catch (err) {
      next(err);
    }
  },
  detailmage: async (req, res, next) => {
    try {
      const { fileId } = req.params;
      if (!fileId) {
        return res.status(400).json({
          status: false,
          message: "Bad Request",
          err: "judul Or deskripsi Not Exist",
          data: null,
        });
      }
      const imageCloud = await imagekit.getFileDetails(fileId);
      if (!imageCloud) {
        return res.status(404).json({
          status: false,
          message: "Error",
          error: "Your request contains invalid fileId parameter",
          data: null,
        });
      }

      const imageDB = await prisma.imageGalery.findUnique({
        where: {
          file_id: fileId,
        },
      });
      return res.status(200).json({
        status: true,
        message: "OK",
        error: null,
        data: { ...imageDB, imgDetail: imageCloud },
      });
    } catch (err) {
      next(err);
    }
  },
  deleteImage: async (req, res, next) => {
    try {
      const { fileId } = req.params;

      const findImage = await prisma.imageGalery.findUnique({
        where: {
          file_id: fileId,
        },
      });

      if (!findImage) {
        return res.status(404).json({
          status: true,
          message: "OK",
          error: "fileId Not found in Database",
          data: null,
        });
      }
      const imageCloud = await imagekit.deleteFile(fileId);
      const imageDb = await prisma.imageGalery.delete({
        where: {
          file_id: fileId,
        },
      });
      return res.status(200).json({
        status: true,
        message: "OK",
        error: null,
        data: { ...imageDb },
      });
    } catch (err) {
      next(err);
    }
  },
  updateGalery: async (req, res, next) => {
    try {
      const { judul, deskripsi } = req.body;
      const { fileId } = req.params;
      if (!judul || !deskripsi) {
        return res.status(400).json({
          status: false,
          message: "Bad Request",
          err: "judul Or deskripsi Not Exist",
          data: null,
        });
      }

      const findImage = await prisma.imageGalery.findUnique({
        where: {
          file_id: fileId,
        },
      });

      if (!findImage) {
        return res.status(404).json({
          status: true,
          message: "OK",
          error: "fileId Not found in Database",
          data: null,
        });
      }
      let updateGalery = await prisma.imageGalery.update({
        where: {
          file_id: fileId,
        },
        data: {
          judul,
          deskripsi,
        },
      });
      return res.status(200).json({
        status: true,
        message: "OK",
        error: null,
        data: { updateGalery },
      });
    } catch (err) {
      next(err);
    }
  },
};
