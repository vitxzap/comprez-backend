/*
  Warnings:

  - You are about to drop the column `destination` on the `compression` table. All the data in the column will be lost.
  - Added the required column `s3Key` to the `compression` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "compression" DROP COLUMN "destination",
ADD COLUMN     "s3Key" TEXT NOT NULL;
