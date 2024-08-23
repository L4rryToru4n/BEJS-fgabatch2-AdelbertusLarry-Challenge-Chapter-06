/*
  Warnings:

  - You are about to drop the column `image_description` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `image_title` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `video_description` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `video_title` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `video_url` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "image_description",
DROP COLUMN "image_title",
DROP COLUMN "image_url",
DROP COLUMN "video_description",
DROP COLUMN "video_title",
DROP COLUMN "video_url";

-- CreateTable
CREATE TABLE "Medias" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "image_url" TEXT,
    "image_title" TEXT,
    "image_description" TEXT,
    "video_url" TEXT,
    "video_title" TEXT,
    "video_description" TEXT,

    CONSTRAINT "Medias_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Medias" ADD CONSTRAINT "Medias_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
