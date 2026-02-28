/*
  Warnings:

  - You are about to drop the column `statusId` on the `compression` table. All the data in the column will be lost.
  - You are about to drop the `status` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CREATED', 'WAITING', 'PENDING', 'FINISHED', 'FAILED');

-- DropForeignKey
ALTER TABLE "compression" DROP CONSTRAINT "compression_statusId_fkey";

-- AlterTable
ALTER TABLE "compression" DROP COLUMN "statusId",
ADD COLUMN     "statuts" "Status" NOT NULL DEFAULT 'CREATED';

-- DropTable
DROP TABLE "status";
