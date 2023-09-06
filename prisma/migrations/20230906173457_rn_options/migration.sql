/*
  Warnings:

  - You are about to drop the column `outputFileDir` on the `Options` table. All the data in the column will be lost.
  - You are about to drop the column `outputFileURLTemplate` on the `Options` table. All the data in the column will be lost.
  - You are about to drop the column `outputFilenameIDLength` on the `Options` table. All the data in the column will be lost.
  - You are about to drop the column `outputIRCMaxChars` on the `Options` table. All the data in the column will be lost.
  - You are about to drop the column `outputIRCMaxNewlines` on the `Options` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Options" DROP COLUMN "outputFileDir",
DROP COLUMN "outputFileURLTemplate",
DROP COLUMN "outputFilenameIDLength",
DROP COLUMN "outputIRCMaxChars",
DROP COLUMN "outputIRCMaxNewlines",
ADD COLUMN     "outputFileBaseURL" TEXT,
ADD COLUMN     "outputFilePath" TEXT NOT NULL DEFAULT 'output',
ADD COLUMN     "outputFilenameLength" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "outputIRCMessageMaxLength" INTEGER NOT NULL DEFAULT 440,
ADD COLUMN     "outputIRCMessageMaxNewlines" INTEGER NOT NULL DEFAULT 4,
ADD COLUMN     "outputURLFilenameExtension" BOOLEAN NOT NULL DEFAULT true;
