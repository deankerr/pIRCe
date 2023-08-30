/*
  Warnings:

  - You are about to drop the `ModelChat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ModelImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ModelChat";

-- DropTable
DROP TABLE "ModelImage";

-- CreateTable
CREATE TABLE "ChatModel" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "headers" TEXT NOT NULL DEFAULT '{}',
    "model" TEXT NOT NULL,
    "max_tokens" INTEGER NOT NULL DEFAULT 128,
    "temperature" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "choices" INTEGER NOT NULL DEFAULT 1,
    "top_p" INTEGER NOT NULL DEFAULT 1,
    "n" INTEGER NOT NULL DEFAULT 1,
    "stop" TEXT NOT NULL DEFAULT '[]',
    "presence_penalty" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "frequency_penalty" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "logit_bias" TEXT NOT NULL DEFAULT '{}',
    "top_k" INTEGER NOT NULL DEFAULT 0,
    "transforms" TEXT NOT NULL DEFAULT '[''middle-out'']',

    CONSTRAINT "ChatModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageModel" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "n" INTEGER NOT NULL DEFAULT 1,
    "size" TEXT NOT NULL DEFAULT '1024x1024',
    "response_format" TEXT NOT NULL DEFAULT 'b64_json',

    CONSTRAINT "ImageModel_pkey" PRIMARY KEY ("id")
);
