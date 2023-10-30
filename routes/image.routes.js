const router = require("express").Router();
const { uploadImage, getAllImage,detailmage,deleteImage,updateGalery } = require("../controllers/auth.controllers");
const { image } = require("../libs/multer");


router.get("/galerys", getAllImage);
router.get("/galery/:fileId/details", detailmage);
router.post("/galery", image.single("galery"), uploadImage);
router.put("/galery/:fileId/rename", updateGalery);
router.delete("/galery/:fileId", deleteImage);


module.exports = router;
