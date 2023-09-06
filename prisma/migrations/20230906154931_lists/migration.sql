/*
  Warnings:

  - You are about to drop the column `examplePrompt` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `maxHistoryLength` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `maxLocalIRCLength` on the `Profile` table. All the data in the column will be lost.
  - Made the column `label` on table `Model` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Model" ALTER COLUMN "label" SET NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "examplePrompt",
DROP COLUMN "maxHistoryLength",
DROP COLUMN "maxLocalIRCLength",
ADD COLUMN     "examplePromptList" TEXT,
ADD COLUMN     "maxConversationLength" INTEGER,
ADD COLUMN     "maxLocalMessageLength" INTEGER;
