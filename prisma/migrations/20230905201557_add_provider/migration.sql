-- AlterTable
ALTER TABLE "Options" ADD COLUMN     "appName" TEXT NOT NULL DEFAULT 'pIRCe',
ADD COLUMN     "appURL" TEXT NOT NULL DEFAULT 'http://pirce.dev';

-- CreateTable
CREATE TABLE "Platform" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Platform_pkey" PRIMARY KEY ("id")
);
