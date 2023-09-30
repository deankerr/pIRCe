/*
  Warnings:

  - You are about to drop the column `profileVersion` on the `ConversationTag` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profileID,messageID]` on the table `ConversationTag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ConversationTag" DROP CONSTRAINT "ConversationTag_profileID_profileVersion_fkey";

-- DropIndex
DROP INDEX "ConversationTag_profileID_profileVersion_messageID_key";

-- DropIndex
DROP INDEX "Profile_id_version_key";

-- AlterTable
ALTER TABLE "ConversationTag" DROP COLUMN "profileVersion";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "version";

-- CreateIndex
CREATE UNIQUE INDEX "ConversationTag_profileID_messageID_key" ON "ConversationTag"("profileID", "messageID");

-- AddForeignKey
ALTER TABLE "ConversationTag" ADD CONSTRAINT "ConversationTag_profileID_fkey" FOREIGN KEY ("profileID") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
