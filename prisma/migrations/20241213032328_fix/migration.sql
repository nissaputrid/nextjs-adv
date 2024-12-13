/*
  Warnings:

  - You are about to drop the column `twofactorSecret` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "twofactorSecret",
ADD COLUMN     "twoFactorSecret" TEXT;
