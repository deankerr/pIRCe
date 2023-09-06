/*
  Warnings:

  - You are about to drop the column `promptStyle` on the `Model` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Model" DROP COLUMN "promptStyle",
ADD COLUMN     "promptFormat" TEXT,
ALTER COLUMN "feature" DROP NOT NULL;
