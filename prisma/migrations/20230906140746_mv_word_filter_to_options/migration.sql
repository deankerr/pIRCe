/*
  Warnings:

  - You are about to drop the column `moderationProfile` on the `Options` table. All the data in the column will be lost.
  - You are about to drop the `WordList` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Options"
RENAME COLUMN "moderationProfile" TO "moderationProfileList";
ALTER TABLE "Options"
ADD COLUMN "wordFilterList" TEXT NOT NULL DEFAULT '[]';

-- DropTable
DROP TABLE "WordList";
