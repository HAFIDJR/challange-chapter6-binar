/*
  Warnings:

  - A unique constraint covering the columns `[file_id]` on the table `ImageGalery` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `file_id` to the `ImageGalery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImageGalery" ADD COLUMN     "file_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ImageGalery_file_id_key" ON "ImageGalery"("file_id");
