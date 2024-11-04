/*
  Warnings:

  - A unique constraint covering the columns `[Business_phone]` on the table `Business` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Business_Business_id_Business_phone_key";

-- CreateIndex
CREATE UNIQUE INDEX "Business_Business_phone_key" ON "Business"("Business_phone");
