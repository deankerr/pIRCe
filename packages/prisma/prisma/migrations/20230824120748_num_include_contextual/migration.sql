-- AlterTable
ALTER TABLE "Options" ALTER COLUMN "outputMaxCharsPerLine" SET DEFAULT 100;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "numIncludeContextual" INTEGER NOT NULL DEFAULT 0;
