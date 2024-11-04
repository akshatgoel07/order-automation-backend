/*
  Warnings:

  - You are about to drop the column `Business_address` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `Business_name` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `Business_phone` on the `Business` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Business_email]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Business_Business_phone_key";

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "Business_address",
DROP COLUMN "Business_name",
DROP COLUMN "Business_phone",
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Business_Business_email_key" ON "Business"("Business_email");
