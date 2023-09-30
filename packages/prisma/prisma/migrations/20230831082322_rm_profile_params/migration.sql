/*
  Warnings:

  - You are about to drop the column `choices` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `maxTokens` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `stop` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `temperature` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "choices",
DROP COLUMN "maxTokens",
DROP COLUMN "stop",
DROP COLUMN "temperature";
