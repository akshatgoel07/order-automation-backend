import { Router, Request, Response } from "express";
import { prismaClient } from "../db";

const router = Router();

//todo check why not working

router.post("/:Business_id", async (req: Request, res: Response) => {
	try {
		const { Business_id } = req.params;
		const businessId = parseInt(Business_id, 10);

		if (isNaN(businessId)) {
			res.status(500).json({ message: "Invalid Business Id" });
		}
		const { Item_name, Item_price } = req.body;
		const newItem = await prismaClient.item.create({
			data: {
				Item_name: Item_name,
				Item_price: Item_price,
				fk_business_id: businessId,
			},
		});
		res.status(201).json({ message: "New Item Created", newItem });
	} catch (error) {
		res.status(500).json({ error: "Error creating new item." });
	}
});

router.get("/by-id/:Item_id", async (req: Request, res: Response) => {
	try {
		const { Item_id } = req.params;
		const item = await prismaClient.item.findMany({
			where: {
				Item_id: parseInt(Item_id),
			},
		});
		res.status(200).json({ item });
	} catch (error) {
		res.status(500).json({ error: "Error fetching items." });
	}
});

router.get("/by-business/:Business_id", async (req: Request, res: Response) => {
	try {
		const { Business_id } = req.params;

		const item = await prismaClient.item.findMany({
			where: {
				fk_business_id: parseInt(Business_id),
			},
		});
		res.status(200).json({ item });
	} catch (error) {
		res.status(500).json({ error: "Error fetching items." });
	}
});

router.put("/:Item_id", async (req: Request, res: Response) => {
	try {
		const { Item_id } = req.params;
		const { Item_name, Item_price } = req.body;
		const updatedItem = await prismaClient.item.update({
			where: {
				Item_id: parseInt(Item_id),
			},
			data: {
				Item_name: Item_name,
				Item_price: Item_price,
			},
		});
		res.status(200).json({ message: "Item updated", updatedItem });
	} catch (error) {
		res.status(500).json({ error: "Error updating item." });
	}
});

router.delete("/:Item_id", async (req: Request, res: Response) => {
	try {
		const { Item_id } = req.params;
		await prismaClient.item.delete({
			where: {
				Item_id: parseInt(Item_id),
			},
		});
		res.status(200).json({ message: `Item deleted` });
	} catch (error) {
		res.status(500).json({ error: "Error deleting item." });
	}
});

export const ItemRouter = router;
