/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id,version]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_messageID_fkey";

-- DropTable
DROP TABLE "Tag";

-- CreateTable
CREATE TABLE "ConversationTag" (
    "id" SERIAL NOT NULL,
    "profileID" INTEGER NOT NULL,
    "profileVersion" INTEGER NOT NULL,
    "messageID" INTEGER NOT NULL,
    "metadata" TEXT,

    CONSTRAINT "ConversationTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConversationTag_profileID_profileVersion_messageID_key" ON "ConversationTag"("profileID", "profileVersion", "messageID");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_version_key" ON "Profile"("id", "version");

-- AddForeignKey
ALTER TABLE "ConversationTag" ADD CONSTRAINT "ConversationTag_profileID_profileVersion_fkey" FOREIGN KEY ("profileID", "profileVersion") REFERENCES "Profile"("id", "version") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationTag" ADD CONSTRAINT "ConversationTag_messageID_fkey" FOREIGN KEY ("messageID") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
