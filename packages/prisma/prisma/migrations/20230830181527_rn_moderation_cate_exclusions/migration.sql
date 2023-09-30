/*
  Warnings:

  - You are about to drop the column `moderationProfile` on the `Options` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Options" DROP COLUMN "moderationProfile",
ADD COLUMN     "moderationCategoryExclusions" TEXT NOT NULL DEFAULT '[]';
