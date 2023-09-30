-- AlterTable
ALTER TABLE "Options" ADD COLUMN     "apiTimeoutMs" INTEGER NOT NULL DEFAULT 10000;

-- CreateTable
CREATE TABLE "ModelChat" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "headers" TEXT NOT NULL DEFAULT '{}',
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

    CONSTRAINT "ModelChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModelImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "n" INTEGER NOT NULL DEFAULT 1,
    "size" TEXT NOT NULL DEFAULT '1024x1024',
    "response_format" TEXT NOT NULL DEFAULT 'b64_json',

    CONSTRAINT "ModelImage_pkey" PRIMARY KEY ("id")
);
