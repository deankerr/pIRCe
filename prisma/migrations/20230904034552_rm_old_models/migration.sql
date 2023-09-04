/*
  Warnings:

  - You are about to drop the column `chatModelID` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `ChatModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ImageModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_chatModelID_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "chatModelID",
ADD COLUMN     "modelID" TEXT;

-- DropTable
DROP TABLE "ChatModel";

-- DropTable
DROP TABLE "ImageModel";

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_modelID_fkey" FOREIGN KEY ("modelID") REFERENCES "Model"("id") ON DELETE SET NULL ON UPDATE CASCADE;
