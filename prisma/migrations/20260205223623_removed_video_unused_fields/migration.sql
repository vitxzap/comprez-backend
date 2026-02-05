/*
  Warnings:

  - The primary key for the `video` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `encoding` on the `video` table. All the data in the column will be lost.
  - You are about to drop the column `fieldname` on the `video` table. All the data in the column will be lost.
  - You are about to drop the column `filename` on the `video` table. All the data in the column will be lost.
  - You are about to drop the column `mimetype` on the `video` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `video` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `video` table. All the data in the column will be lost.
  - The `id` column on the `video` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `compressedSize` to the `video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ext` to the `video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalSize` to the `video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preset` to the `video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "video" DROP CONSTRAINT "video_pkey",
DROP COLUMN "encoding",
DROP COLUMN "fieldname",
DROP COLUMN "filename",
DROP COLUMN "mimetype",
DROP COLUMN "path",
DROP COLUMN "size",
ADD COLUMN     "compressedSize" INTEGER NOT NULL,
ADD COLUMN     "ext" TEXT NOT NULL,
ADD COLUMN     "originalSize" INTEGER NOT NULL,
ADD COLUMN     "preset" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT uuidv7(),
ADD CONSTRAINT "video_pkey" PRIMARY KEY ("id");
