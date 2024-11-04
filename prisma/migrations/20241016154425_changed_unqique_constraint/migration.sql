/*
  Warnings:

  - A unique constraint covering the columns `[Item_name,Item_price]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Item_Item_name_fk_business_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Item_Item_name_Item_price_key" ON "Item"("Item_name", "Item_price");
