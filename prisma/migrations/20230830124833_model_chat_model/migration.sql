/*
  Warnings:

  - Added the required column `model` to the `ModelChat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ModelChat" ADD COLUMN     "model" TEXT NOT NULL;
