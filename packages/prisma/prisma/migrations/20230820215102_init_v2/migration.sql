-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "target" TEXT NOT NULL,
    "nick" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "self" BOOLEAN NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mask" TEXT NOT NULL,
    "server" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" SERIAL NOT NULL,
    "server" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "startsWith" TEXT,
    "contains" TEXT,
    "handler" TEXT NOT NULL,
    "redirectOutput" TEXT,
    "profileID" TEXT,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "promptTail" TEXT,
    "maxTokens" INTEGER NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL DEFAULT 0.9,
    "choices" INTEGER NOT NULL DEFAULT 1,
    "stop" TEXT[],
    "maxHistorySize" INTEGER NOT NULL,
    "replaceNick" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "messageID" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Options" (
    "options" TEXT NOT NULL DEFAULT 'options',
    "adminKeyword" TEXT NOT NULL DEFAULT '!!admin!!',
    "requireModeration" BOOLEAN NOT NULL,
    "allowModCategories" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Options_pkey" PRIMARY KEY ("options")
);

-- CreateTable
CREATE TABLE "WordList" (
    "word" TEXT NOT NULL,

    CONSTRAINT "WordList_pkey" PRIMARY KEY ("word")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_messageID_key_key" ON "Tag"("messageID", "key");

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_profileID_fkey" FOREIGN KEY ("profileID") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_messageID_fkey" FOREIGN KEY ("messageID") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
