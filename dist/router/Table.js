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
exports.tableRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const router = (0, express_1.Router)();
router.post("/:businessId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { businessId } = req.params;
        const { Table_number } = req.body;
        const newTable = yield db_1.prismaClient.table.create({
            data: {
                Table_number: Table_number,
                fk_business_id: parseInt(businessId),
            },
        });
        res.status(201).json({ message: "New Table Created", newTable });
    }
    catch (error) {
        console.error("Error creating Table:", error);
        res.status(500).json({ error: "Error creating Table." });
    }
}));
router.get("/by-id/:Table_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Table_id = req.params.Table_id;
        const allTables = yield db_1.prismaClient.table.findMany({
            where: {
                Table_id: parseInt(Table_id),
            },
        });
        res.status(200).json({ allTables });
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching Tables." });
    }
}));
router.get("/by-business/:businessId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { businessId } = req.params;
        const allTables = yield db_1.prismaClient.table.findMany({
            where: {
                fk_business_id: parseInt(businessId),
            },
        });
        console.log(allTables);
        res.status(200).json({ allTables });
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching Tables." });
    }
}));
router.put("/:Table_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Table_id } = req.params;
        const { Table_number } = req.body;
        const updatedTable = yield db_1.prismaClient.table.update({
            where: {
                Table_id: parseInt(Table_id),
            },
            data: {
                Table_number: Table_number,
            },
        });
        res.status(200).json({ message: "Table updated", updatedTable });
    }
    catch (error) {
        res.status(500).json({ error: "Error updating item." });
    }
}));
router.delete("/:Table_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Table_id } = req.params;
        const { Table_number } = req.body;
        yield db_1.prismaClient.table.delete({
            where: {
                Table_id: parseInt(Table_id),
            },
        });
        res.status(200).json({ message: `Table deleted` });
    }
    catch (error) {
        res.status(500).json({ error: "Error deleting item." });
    }
}));
``;
exports.tableRouter = router;
