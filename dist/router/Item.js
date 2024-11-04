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
exports.ItemRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const router = (0, express_1.Router)();
//todo check why not working
router.post("/:Business_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Business_id } = req.params;
        const businessId = parseInt(Business_id, 10);
        if (isNaN(businessId)) {
            res.status(500).json({ message: "Invalid Business Id" });
        }
        const { Item_name, Item_price } = req.body;
        const newItem = yield db_1.prismaClient.item.create({
            data: {
                Item_name: Item_name,
                Item_price: Item_price,
                fk_business_id: businessId,
            },
        });
        res.status(201).json({ message: "New Item Created", newItem });
    }
    catch (error) {
        res.status(500).json({ error: "Error creating new item." });
    }
}));
router.get("/by-id/:Item_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Item_id } = req.params;
        const item = yield db_1.prismaClient.item.findMany({
            where: {
                Item_id: parseInt(Item_id),
            },
        });
        res.status(200).json({ item });
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching items." });
    }
}));
router.get("/by-business/:Business_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Business_id } = req.params;
        const item = yield db_1.prismaClient.item.findMany({
            where: {
                fk_business_id: parseInt(Business_id),
            },
        });
        res.status(200).json({ item });
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching items." });
    }
}));
router.put("/:Item_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Item_id } = req.params;
        const { Item_name, Item_price } = req.body;
        const updatedItem = yield db_1.prismaClient.item.update({
            where: {
                Item_id: parseInt(Item_id),
            },
            data: {
                Item_name: Item_name,
                Item_price: Item_price,
            },
        });
        res.status(200).json({ message: "Item updated", updatedItem });
    }
    catch (error) {
        res.status(500).json({ error: "Error updating item." });
    }
}));
router.delete("/:Item_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Item_id } = req.params;
        yield db_1.prismaClient.item.delete({
            where: {
                Item_id: parseInt(Item_id),
            },
        });
        res.status(200).json({ message: `Item deleted` });
    }
    catch (error) {
        res.status(500).json({ error: "Error deleting item." });
    }
}));
exports.ItemRouter = router;
