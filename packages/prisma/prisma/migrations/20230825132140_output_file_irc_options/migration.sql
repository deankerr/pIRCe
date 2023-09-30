/*
  Warnings:

  - You are about to drop the column `outputFileBaseURL` on the `Options` table. All the data in the column will be lost.
  - You are about to drop the column `outputMaxCharsPerLine` on the `Options` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Options" DROP COLUMN "outputFileBaseURL",
DROP COLUMN "outputMaxCharsPerLine",
ADD COLUMN     "outputFileDir" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "outputFileURLTemplate" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "outputIRCMaxNewlines" INTEGER NOT NULL DEFAULT 4;
