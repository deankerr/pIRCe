/*
  Warnings:

  - You are about to drop the column `choices` on the `ChatModel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ChatModel" DROP COLUMN "choices",
ALTER COLUMN "transforms" SET DEFAULT '["middle-out"]';
