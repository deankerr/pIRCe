/*
  Warnings:

  - You are about to drop the column `allowModCategories` on the `Options` table. All the data in the column will be lost.
  - You are about to drop the column `requireModeration` on the `Options` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Options" DROP COLUMN "allowModCategories",
DROP COLUMN "requireModeration",
ADD COLUMN     "moderationProfile" TEXT NOT NULL DEFAULT '[]';

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "chatModelID" TEXT;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_chatModelID_fkey" FOREIGN KEY ("chatModelID") REFERENCES "ChatModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
