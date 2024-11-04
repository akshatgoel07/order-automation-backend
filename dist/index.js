"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Item_1 = require("./router/Item");
const Table_1 = require("./router/Table");
const Business_1 = require("./router/Business");
const quantity_1 = require("./router/quantity");
const Order_1 = require("./router/Order");
const middleware_1 = require("./middleware");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/business", Business_1.BusinessRouter);
app.use("/api/v1/item", middleware_1.authenticateJWT, Item_1.ItemRouter);
app.use("/api/v1/table", middleware_1.authenticateJWT, Table_1.tableRouter); // Remove :businessId from here
app.use("/api/v1/quantity", middleware_1.authenticateJWT, quantity_1.QuantityRouter);
app.use("/api/v1/order", middleware_1.authenticateJWT, Order_1.OrderRouter);
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
