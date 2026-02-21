/*
  Warnings:

  - Added the required column `statusId` to the `compression` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "compression" ADD COLUMN     "statusId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "compression" ADD CONSTRAINT "compression_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
