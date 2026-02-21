-- DropForeignKey
ALTER TABLE "compression" DROP CONSTRAINT "compression_statusId_fkey";

-- AlterTable
ALTER TABLE "compression" ALTER COLUMN "statusId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "compression" ADD CONSTRAINT "compression_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
