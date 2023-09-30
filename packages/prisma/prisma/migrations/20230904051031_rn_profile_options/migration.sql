/*
  Warnings:

  - You are about to drop the column `maxHistorySize` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `numIncludeContextual` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `replaceNick` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "maxHistorySize",
DROP COLUMN "numIncludeContextual",
DROP COLUMN "replaceNick",
ADD COLUMN     "characterName" TEXT,
ADD COLUMN     "contextualLength" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "conversationLength" INTEGER NOT NULL DEFAULT 10;
