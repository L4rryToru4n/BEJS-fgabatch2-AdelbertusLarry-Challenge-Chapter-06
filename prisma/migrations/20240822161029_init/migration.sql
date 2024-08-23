/*
  Warnings:

  - You are about to drop the column `image_description` on the `Medias` table. All the data in the column will be lost.
  - You are about to drop the column `image_title` on the `Medias` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Medias` table. All the data in the column will be lost.
  - You are about to drop the column `video_description` on the `Medias` table. All the data in the column will be lost.
  - You are about to drop the column `video_title` on the `Medias` table. All the data in the column will be lost.
  - You are about to drop the column `video_url` on the `Medias` table. All the data in the column will be lost.
  - Added the required column `imagekit_fileId` to the `Medias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medias" DROP COLUMN "image_description",
DROP COLUMN "image_title",
DROP COLUMN "image_url",
DROP COLUMN "video_description",
DROP COLUMN "video_title",
DROP COLUMN "video_url",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "imagekit_fileId" TEXT NOT NULL,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "type" TEXT,
ADD COLUMN     "url" TEXT;
