-- CreateTable
CREATE TABLE "ImageGalery" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "url_picture" TEXT NOT NULL,

    CONSTRAINT "ImageGalery_pkey" PRIMARY KEY ("id")
);
