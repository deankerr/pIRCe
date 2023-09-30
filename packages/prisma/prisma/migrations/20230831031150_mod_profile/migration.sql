/*
  Warnings:

  - You are about to drop the column `moderationCategoryExclusions` on the `Options` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Options" DROP COLUMN "moderationCategoryExclusions",
ADD COLUMN     "moderationProfile" TEXT NOT NULL DEFAULT '[]';
