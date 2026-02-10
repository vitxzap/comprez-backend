/*
  Warnings:

  - You are about to drop the `video` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "video" DROP CONSTRAINT "video_userId_fkey";

-- DropTable
DROP TABLE "video";

-- CreateTable
CREATE TABLE "compression" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "originalName" TEXT NOT NULL,
    "ext" TEXT NOT NULL,
    "preset" TEXT NOT NULL,
    "compressedSize" INTEGER NOT NULL,
    "originalSize" INTEGER NOT NULL,
    "destination" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "compression_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "compression_userId_idx" ON "compression"("userId");

-- AddForeignKey
ALTER TABLE "compression" ADD CONSTRAINT "compression_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
