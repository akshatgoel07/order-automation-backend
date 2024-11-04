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
exports.QuantityRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const router = (0, express_1.Router)();
// router.post("/", async (req: Request, res: Response) => {
// 	try {
// 		const { Item_id, Order_id, Quantity } = req.body;
// 		const newQuantity = await prismaClient.quantity.create({
// 			// fk_order_id: Order_id,
// 			// fk_item_id: parseInt(Item_id),
// 			Quantity: Quantity,
// 		});
// 		res.status(201).json({
// 			message: `New Quantity Created`,
// 			data: newQuantity,
// 		});
// 	} catch (error) {
// 		res.status(500).json({ error: `Error creating Quantity.` });
// 	}
// });
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Quantity_id = req.params.Quantity_id;
        const items = yield db_1.prismaClient.quantity.findMany({
            where: {
                Quantity_id: parseInt(Quantity_id),
            },
        });
        res.status(200).json({ data: items });
    }
    catch (error) {
        res.status(500).json({ error: `Error fetching Quantity` });
    }
}));
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Quantity_id } = req.body;
        const data = req.body;
        const updatedQuantity = yield db_1.prismaClient.quantity.update({
            where: { Quantity_id: Quantity_id },
            data,
        });
        res.status(200).json({
            message: `Quantity updated`,
            data: updatedQuantity,
        });
    }
    catch (error) {
        res.status(500).json({ error: `Error updating Quantity.` });
    }
}));
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Quantity_id } = req.body;
        yield db_1.prismaClient.quantity.delete({
            where: { Quantity_id: Quantity_id },
        });
        res.status(200).json({ message: `Quantity deleted.` });
    }
    catch (error) {
        res.status(500).json({ error: `Error deleting Quantity.` });
    }
}));
exports.QuantityRouter = router;
