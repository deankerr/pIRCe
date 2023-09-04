/*
  Warnings:

  - You are about to drop the column `adminKeyword` on the `Options` table. All the data in the column will be lost.
  - You are about to drop the column `contains` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `redirectOutput` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `startsWith` on the `Route` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Options" DROP COLUMN "adminKeyword";

-- AlterTable
ALTER TABLE "Route" DROP COLUMN "contains",
DROP COLUMN "redirectOutput",
DROP COLUMN "startsWith",
ADD COLUMN     "keyword" TEXT,
ADD COLUMN     "mentionsKeyword" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "overrideOutputTarget" TEXT,
ADD COLUMN     "startsWithKeyword" BOOLEAN NOT NULL DEFAULT true;
