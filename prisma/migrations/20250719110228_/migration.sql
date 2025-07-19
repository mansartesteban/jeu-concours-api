-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ville" TEXT,
    "instagramHandle" TEXT,
    "nom" TEXT,
    "prenom" TEXT,
    "email" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_instagramHandle_key" ON "User"("instagramHandle");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
