-- CreateEnum
CREATE TYPE "Food_Type" AS ENUM ('Food', 'Drink');

-- CreateEnum
CREATE TYPE "Order_Status" AS ENUM ('Pending', 'Delivered');

-- CreateTable
CREATE TABLE "Item" (
    "Item_id" SERIAL NOT NULL,
    "Item_name" TEXT NOT NULL,
    "Item_price" INTEGER NOT NULL,
    "fk_business_id" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("Item_id")
);

-- CreateTable
CREATE TABLE "Table" (
    "Table_id" SERIAL NOT NULL,
    "Table_number" INTEGER NOT NULL,
    "fk_business_id" INTEGER NOT NULL,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("Table_id")
);

-- CreateTable
CREATE TABLE "Business" (
    "Business_id" SERIAL NOT NULL,
    "Business_name" TEXT NOT NULL,
    "Business_address" TEXT NOT NULL,
    "Business_phone" INTEGER NOT NULL,
    "Business_email" TEXT NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("Business_id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "Order_id" SERIAL NOT NULL,
    "Order_status" "Order_Status" NOT NULL,
    "fk_table_id" INTEGER NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("Order_id")
);

-- CreateTable
CREATE TABLE "Quantity" (
    "Quantity_id" SERIAL NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "fk_item_id" INTEGER NOT NULL,
    "fk_order_id" INTEGER NOT NULL,

    CONSTRAINT "Quantity_pkey" PRIMARY KEY ("Quantity_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_Item_name_fk_business_id_key" ON "Item"("Item_name", "fk_business_id");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_fk_business_id_fkey" FOREIGN KEY ("fk_business_id") REFERENCES "Business"("Business_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_fk_business_id_fkey" FOREIGN KEY ("fk_business_id") REFERENCES "Business"("Business_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_fk_table_id_fkey" FOREIGN KEY ("fk_table_id") REFERENCES "Table"("Table_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quantity" ADD CONSTRAINT "Quantity_fk_item_id_fkey" FOREIGN KEY ("fk_item_id") REFERENCES "Item"("Item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quantity" ADD CONSTRAINT "Quantity_fk_order_id_fkey" FOREIGN KEY ("fk_order_id") REFERENCES "Orders"("Order_id") ON DELETE RESTRICT ON UPDATE CASCADE;
