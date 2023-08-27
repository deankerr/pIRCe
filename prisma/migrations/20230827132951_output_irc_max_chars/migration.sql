-- AlterTable
ALTER TABLE "Options" ADD COLUMN     "outputIRCMaxChars" INTEGER NOT NULL DEFAULT 440,
ALTER COLUMN "outputFileDir" SET DEFAULT 'output';
