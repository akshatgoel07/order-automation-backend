import { Router, Request, Response } from "express";

import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
	try {
		console.log("Control reached top of post route");
		console.log("req.body", req.body);
		const { Business_email, password } = req.body;
		console.log("Control reached top of business creation logic route");
		const newBusiness = await prismaClient.business.create({
			data: {
				Business_email: Business_email,
				password: password,
			},
		});
		const token = jwt.sign(
			{
				Business_id: newBusiness.Business_id,
				Business_email: newBusiness.Business_email,
			},
			process.env.JWT_SECRET as string,
		);

		res.status(201).json({
			message: "New Business Created",
			newBusiness,
			token,
		});
	} catch (error) {
		res.status(500).json({
			error: "Error creating Business.",
		});
	}
});

// router.post("/signin", async (req: Request, res: Response) => {
// 	try {
// 		console.log("req.body", req.body);
// 		const { Business_email, password } = req.body;
// 		const existingBusiness = await prismaClient.business.findUnique({
// 			where: {
// 				Business_email: Business_email,
// 			},
// 		});

// 		if (!existingBusiness) {
// 			return res
// 				.status(401)
// 				.json({ error: "Invalid email or password." });
// 		}

// 		if (existingBusiness.password !== password) {
// 			return res
// 				.status(401)
// 				.json({ error: "Invalid email or password." });
// 		}

// 		const token = jwt.sign(
// 			{
// 				Business_id: existingBusiness.Business_id,
// 				Business_email: existingBusiness.Business_email,
// 			},
// 			process.env.JWT_SECRET as string,
// 		);

// 		res.status(200).json({
// 			message: "Business signed in successfully",
// 			business: {
// 				Business_id: existingBusiness.Business_id,
// 				Business_email: existingBusiness.Business_email,
// 			},
// 			token,
// 		});
// 	} catch (error) {
// 		res.status(500).json({ error: "Error signing in." });
// 	}
// });

router.get("/", async (req: Request, res: Response) => {
	try {
		const allBusiness = await prismaClient.business.findMany({});
		res.status(200).json({ allBusiness });
	} catch (error) {
		res.status(500).json({ error: "Error fetching Business." });
	}
});

router.put("/:businessId", async (req: Request, res: Response) => {
	try {
		const { businessId } = req.params;
		const { Business_email, password } = req.body;
		const updatedBusiness = await prismaClient.business.update({
			where: {
				Business_id: parseInt(businessId),
			},
			data: {
				Business_email: Business_email,
				password: password,
			},
		});
		res.status(200).json({
			message: "Business details updated",
			updatedBusiness,
		});
	} catch (error) {
		res.status(500).json({ error: "Error updating Business." });
	}
});

router.delete("/:businessId", async (req: Request, res: Response) => {
	try {
		const { businessId } = req.params;
		await prismaClient.business.delete({
			where: {
				Business_id: parseInt(businessId),
			},
		});
		res.status(200).json({ message: `Business deleted` });
	} catch (error) {
		res.status(500).json({ error: "Error deleting Business." });
	}
});

export const BusinessRouter = router;
