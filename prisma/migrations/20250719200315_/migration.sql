/*
  Warnings:

  - You are about to drop the column `instagramHandle` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `prenom` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `ville` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_instagramHandle_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "instagramHandle",
DROP COLUMN "nom",
DROP COLUMN "prenom",
DROP COLUMN "ville";

-- CreateTable
CREATE TABLE "Entrant" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ville" TEXT,
    "instagramHandle" TEXT,
    "nom" TEXT,
    "prenom" TEXT,
    "email" TEXT,

    CONSTRAINT "Entrant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entrant_instagramHandle_key" ON "Entrant"("instagramHandle");

-- CreateIndex
CREATE UNIQUE INDEX "Entrant_email_key" ON "Entrant"("email");
