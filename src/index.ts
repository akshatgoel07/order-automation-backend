import express from "express";
import { ItemRouter } from "./router/Item";
import { tableRouter } from "./router/Table";
import { BusinessRouter } from "./router/Business";
import { QuantityRouter } from "./router/quantity";
import { OrderRouter } from "./router/Order";
import { authenticateJWT } from "./middleware";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/business", BusinessRouter);
app.use("/api/v1/item", authenticateJWT, ItemRouter);
app.use("/api/v1/table", authenticateJWT, tableRouter); // Remove :businessId from here
app.use("/api/v1/quantity", authenticateJWT, QuantityRouter);
app.use("/api/v1/order", authenticateJWT, OrderRouter);

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
