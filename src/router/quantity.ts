import { Router, Request, Response } from "express";
import { prismaClient } from "../db";

const router = Router();

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

router.get("/", async (req: Request, res: Response) => {
	try {
		const Quantity_id = req.params.Quantity_id;
		const items = await prismaClient.quantity.findMany({
			where: {
				Quantity_id: parseInt(Quantity_id),
			},
		});
		res.status(200).json({ data: items });
	} catch (error) {
		res.status(500).json({ error: `Error fetching Quantity` });
	}
});

router.put("/", async (req: Request, res: Response) => {
	try {
		const { Quantity_id } = req.body;
		const data = req.body;
		const updatedQuantity = await prismaClient.quantity.update({
			where: { Quantity_id: Quantity_id },
			data,
		});
		res.status(200).json({
			message: `Quantity updated`,
			data: updatedQuantity,
		});
	} catch (error) {
		res.status(500).json({ error: `Error updating Quantity.` });
	}
});

router.delete("/", async (req: Request, res: Response) => {
	try {
		const { Quantity_id } = req.body;
		await prismaClient.quantity.delete({
			where: { Quantity_id: Quantity_id },
		});
		res.status(200).json({ message: `Quantity deleted.` });
	} catch (error) {
		res.status(500).json({ error: `Error deleting Quantity.` });
	}
});

export const QuantityRouter = router;
