/*
  Warnings:

  - You are about to drop the column `modelID` on the `Profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_modelID_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "modelID";

-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "modelID" TEXT;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_modelID_fkey" FOREIGN KEY ("modelID") REFERENCES "Model"("id") ON DELETE SET NULL ON UPDATE CASCADE;
