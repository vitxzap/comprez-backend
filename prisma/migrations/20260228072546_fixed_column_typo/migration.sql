/*
  Warnings:

  - You are about to drop the column `statuts` on the `compression` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "compression" DROP COLUMN "statuts",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'CREATED';
