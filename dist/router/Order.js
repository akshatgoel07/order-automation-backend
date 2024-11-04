"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const router = (0, express_1.Router)();
router.post("/:Table_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Table_id } = req.params;
        const { items } = req.body;
        const result = yield db_1.prismaClient.$transaction(() => __awaiter(void 0, void 0, void 0, function* () {
            const status = "Pending";
            const newOrder = yield db_1.prismaClient.orders.create({
                data: {
                    Order_status: status,
                    fk_table_id: parseInt(Table_id),
                },
            });
            console.log(items);
            console.log(newOrder.Order_id.toString());
            const newQuantities = yield db_1.prismaClient.quantity.createMany({
                data: Object.entries(items).map(([itemId, quantity]) => ({
                    Quantity: parseInt(quantity),
                    fk_item_id: parseInt(itemId),
                    fk_order_id: parseInt(newOrder.Order_id.toString()),
                })),
            });
            return { newOrder, insertedQuantities: newQuantities.count };
        }));
        res.status(201).json({
            message: "New Order Created",
            order: result.newOrder,
            // quantities: result.newQuantities,
        });
    }
    catch (error) {
        console.error("Error creating Order:", error);
        res.status(500).json({ error: "Error creating Order." });
    }
}));
//todo fix this logic
router.get("/:Table_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allOrders = yield db_1.prismaClient.orders.findMany({
            where: {
                Order_status: "Pending",
            },
        });
        res.status(200).json({ allOrders });
    }
    catch (error) {
        res.status(500).json({ error: "Error updating item." });
    }
}));
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // right now you can only update the status for kitchen dashboard
    try {
        const { Order_id } = req.params;
        const { Order_status } = req.body;
        const updatedOrders = yield db_1.prismaClient.orders.update({
            where: {
                Order_id: parseInt(Order_id),
            },
            data: {
                Order_status: Order_status,
            },
        });
        res.status(200).json({ message: "Orders updated", updatedOrders });
    }
    catch (error) {
        res.status(500).json({ error: "Error updating item." });
    }
}));
router.delete("/:Order_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Order_id } = req.params;
        yield db_1.prismaClient.orders.delete({
            where: {
                Order_id: parseInt(Order_id),
            },
        });
        res.status(200).json({ message: `Order deleted` });
    }
    catch (error) {
        res.status(500).json({ error: "Error deleting item." });
    }
}));
exports.OrderRouter = router;
