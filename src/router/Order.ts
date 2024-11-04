import { Router, Request, Response } from "express";
import { prismaClient } from "../db";

const router = Router();

router.post("/:Table_id", async (req: Request, res: Response) => {
	try {
		const { Table_id } = req.params;
		const { items } = req.body;

		const result = await prismaClient.$transaction(async () => {
			const status = "Pending";
			const newOrder = await prismaClient.orders.create({
				data: {
					Order_status: status,
					fk_table_id: parseInt(Table_id),
				},
			});

			console.log(items);
			console.log(newOrder.Order_id.toString());
			const newQuantities = await prismaClient.quantity.createMany({
				data: Object.entries(items).map(([itemId, quantity]) => ({
					Quantity: parseInt(quantity as string),
					fk_item_id: parseInt(itemId),
					fk_order_id: parseInt(newOrder.Order_id.toString()),
				})),
			});

			return { newOrder, insertedQuantities: newQuantities.count };
		});

		res.status(201).json({
			message: "New Order Created",
			order: result.newOrder,
			// quantities: result.newQuantities,
		});
	} catch (error) {
		console.error("Error creating Order:", error);
		res.status(500).json({ error: "Error creating Order." });
	}
});

//todo fix this logic

router.get("/:Table_id", async (req: Request, res: Response) => {
	try {
		const allOrders = await prismaClient.orders.findMany({
			where: {
				Order_status: "Pending",
			},
		});
		res.status(200).json({ allOrders });
	} catch (error) {
		res.status(500).json({ error: "Error updating item." });
	}
});

router.put("/", async (req: Request, res: Response) => {
	// right now you can only update the status for kitchen dashboard
	try {
		const { Order_id } = req.params;
		const { Order_status } = req.body;
		const updatedOrders = await prismaClient.orders.update({
			where: {
				Order_id: parseInt(Order_id),
			},
			data: {
				Order_status: Order_status,
			},
		});
		res.status(200).json({ message: "Orders updated", updatedOrders });
	} catch (error) {
		res.status(500).json({ error: "Error updating item." });
	}
});

router.delete("/:Order_id", async (req: Request, res: Response) => {
	try {
		const { Order_id } = req.params;
		await prismaClient.orders.delete({
			where: {
				Order_id: parseInt(Order_id),
			},
		});
		res.status(200).json({ message: `Order deleted` });
	} catch (error) {
		res.status(500).json({ error: "Error deleting item." });
	}
});

export const OrderRouter = router;
