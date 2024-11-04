import { Router, Request, Response } from "express";
import { prismaClient } from "../db";

const router = Router();

router.post("/:businessId", async (req: Request, res: Response) => {
	try {
		const { businessId } = req.params;
		const { Table_number } = req.body;
		const newTable = await prismaClient.table.create({
			data: {
				Table_number: Table_number,
				fk_business_id: parseInt(businessId),
			},
		});
		res.status(201).json({ message: "New Table Created", newTable });
	} catch (error) {
		console.error("Error creating Table:", error);
		res.status(500).json({ error: "Error creating Table." });
	}
});

router.get("/by-id/:Table_id", async (req: Request, res: Response) => {
	try {
		const Table_id = req.params.Table_id;
		const allTables = await prismaClient.table.findMany({
			where: {
				Table_id: parseInt(Table_id),
			},
		});
		res.status(200).json({ allTables });
	} catch (error) {
		res.status(500).json({ error: "Error fetching Tables." });
	}
});

router.get("/by-business/:businessId", async (req: Request, res: Response) => {
	try {
		const { businessId } = req.params;
		const allTables = await prismaClient.table.findMany({
			where: {
				fk_business_id: parseInt(businessId),
			},
		});
		console.log(allTables);
		res.status(200).json({ allTables });
	} catch (error) {
		res.status(500).json({ error: "Error fetching Tables." });
	}
});

router.put("/:Table_id", async (req: Request, res: Response) => {
	try {
		const { Table_id } = req.params;
		const { Table_number } = req.body;
		const updatedTable = await prismaClient.table.update({
			where: {
				Table_id: parseInt(Table_id),
			},
			data: {
				Table_number: Table_number,
			},
		});
		res.status(200).json({ message: "Table updated", updatedTable });
	} catch (error) {
		res.status(500).json({ error: "Error updating item." });
	}
});

router.delete("/:Table_id", async (req: Request, res: Response) => {
	try {
		const { Table_id } = req.params;
		const { Table_number } = req.body;
		await prismaClient.table.delete({
			where: {
				Table_id: parseInt(Table_id),
			},
		});
		res.status(200).json({ message: `Table deleted` });
	} catch (error) {
		res.status(500).json({ error: "Error deleting item." });
	}
});
``;

export const tableRouter = router;
