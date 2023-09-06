/*
  Warnings:

  - The primary key for the `Model` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `parameters` on the `Model` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Model` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Platform` table. All the data in the column will be lost.
  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `characterName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `contextualLength` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `conversationLength` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `prompt` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `promptTail` on the `Profile` table. All the data in the column will be lost.
  - The `id` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Route` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[label]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `feature` to the `Model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platformID` to the `Model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `promptStyle` to the `Model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Platform` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Route" DROP CONSTRAINT "Route_modelID_fkey";

-- DropForeignKey
ALTER TABLE "Route" DROP CONSTRAINT "Route_profileID_fkey";

-- AlterTable
ALTER TABLE "Model" DROP CONSTRAINT "Model_pkey",
DROP COLUMN "parameters",
DROP COLUMN "url",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "feature" TEXT NOT NULL,
ADD COLUMN     "label" TEXT,
ADD COLUMN     "platformID" TEXT NOT NULL,
ADD COLUMN     "promptStyle" TEXT NOT NULL,
ADD CONSTRAINT "Model_pkey" PRIMARY KEY ("id", "platformID");

-- AlterTable
ALTER TABLE "Options" ALTER COLUMN "apiTimeoutMs" SET DEFAULT 30000;

-- AlterTable
ALTER TABLE "Platform" DROP COLUMN "name",
ADD COLUMN     "label" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
DROP COLUMN "characterName",
DROP COLUMN "contextualLength",
DROP COLUMN "conversationLength",
DROP COLUMN "prompt",
DROP COLUMN "promptTail",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "examplePrompt" TEXT,
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "mainPrompt" TEXT,
ADD COLUMN     "maxHistoryLength" INTEGER,
ADD COLUMN     "maxLocalIRCLength" INTEGER,
ADD COLUMN     "modelID" TEXT,
ADD COLUMN     "parameters" TEXT NOT NULL DEFAULT '{}',
ADD COLUMN     "platformID" TEXT,
ADD COLUMN     "postPrompt" TEXT,
ADD COLUMN     "postPromptOffset" INTEGER,
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Route";

-- CreateTable
CREATE TABLE "Handler" (
    "id" SERIAL NOT NULL,
    "restrictServer" TEXT,
    "restrictTarget" TEXT,
    "restrictAdmin" BOOLEAN NOT NULL DEFAULT false,
    "allowChannel" BOOLEAN NOT NULL DEFAULT true,
    "allowQuery" BOOLEAN NOT NULL DEFAULT false,
    "triggerWord" TEXT,
    "triggerType" TEXT NOT NULL DEFAULT 'command',
    "feature" TEXT,
    "profileID" INTEGER,
    "overrideOutputTarget" TEXT,

    CONSTRAINT "Handler_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_label_key" ON "Profile"("label");

-- AddForeignKey
ALTER TABLE "Handler" ADD CONSTRAINT "Handler_profileID_fkey" FOREIGN KEY ("profileID") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_modelID_platformID_fkey" FOREIGN KEY ("modelID", "platformID") REFERENCES "Model"("id", "platformID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_platformID_fkey" FOREIGN KEY ("platformID") REFERENCES "Platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
