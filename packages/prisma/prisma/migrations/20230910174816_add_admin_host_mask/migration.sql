-- AlterTable
ALTER TABLE "Options" ADD COLUMN     "adminHostMask" TEXT,
ALTER COLUMN "outputFilenameLength" SET DEFAULT 4,
ALTER COLUMN "outputIRCMessageMaxLength" SET DEFAULT 430;
