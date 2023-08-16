-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "target" TEXT NOT NULL,
    "nick" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "allowed" BOOLEAN NOT NULL DEFAULT false,
    "user" TEXT,
    "host" TEXT,
    "server" TEXT NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptionData" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "OptionData_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "ChatHistory" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "server" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "name" TEXT,
    "content" TEXT NOT NULL,

    CONSTRAINT "ChatHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" SERIAL NOT NULL,
    "server" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "matcher" TEXT NOT NULL,
    "handler" TEXT NOT NULL,
    "profileID" INTEGER NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "memoryLength" INTEGER NOT NULL,
    "maxTokens" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Route_server_target_matcher_key" ON "Route"("server", "target", "matcher");

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_profileID_fkey" FOREIGN KEY ("profileID") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
