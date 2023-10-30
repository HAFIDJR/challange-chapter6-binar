const multer = require("multer");
const maxSize = 20 * 1000 * 1000;
function generateFilter(props) {
  let { allowedMimeTypes } = props;
  return multer({
    fileFilter: (req, file, callback) => {
      if (!allowedMimeTypes.includes(file.mimetype)) {
        const err = new Error(
          `Only ${allowedMimeTypes.join(", ")} allowed to upload!`
        );
        return callback(err, false);
      }
      callback(null, true);
    },
    limits: {
      fileSize: maxSize,
    },
    onError: (err, next) => {
      next(err);
    },
  });
}

module.exports = {
  image: generateFilter({
    allowedMimeTypes: ["image/png", "image/jpeg"],
  }),
};
