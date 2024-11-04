/*
  Warnings:

  - A unique constraint covering the columns `[Table_number,fk_business_id]` on the table `Table` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Table_Table_number_fk_business_id_key" ON "Table"("Table_number", "fk_business_id");
