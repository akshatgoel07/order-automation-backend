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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Control reached top of post route");
        console.log("req.body", req.body);
        const { Business_email, password } = req.body;
        console.log("Control reached top of business creation logic route");
        const newBusiness = yield db_1.prismaClient.business.create({
            data: {
                Business_email: Business_email,
                password: password,
            },
        });
        const token = jsonwebtoken_1.default.sign({
            Business_id: newBusiness.Business_id,
            Business_email: newBusiness.Business_email,
        }, process.env.JWT_SECRET);
        res.status(201).json({
            message: "New Business Created",
            newBusiness,
            token,
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Error creating Business.",
        });
    }
}));
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
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBusiness = yield db_1.prismaClient.business.findMany({});
        res.status(200).json({ allBusiness });
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching Business." });
    }
}));
router.put("/:businessId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { businessId } = req.params;
        const { Business_email, password } = req.body;
        const updatedBusiness = yield db_1.prismaClient.business.update({
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
    }
    catch (error) {
        res.status(500).json({ error: "Error updating Business." });
    }
}));
router.delete("/:businessId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { businessId } = req.params;
        yield db_1.prismaClient.business.delete({
            where: {
                Business_id: parseInt(businessId),
            },
        });
        res.status(200).json({ message: `Business deleted` });
    }
    catch (error) {
        res.status(500).json({ error: "Error deleting Business." });
    }
}));
exports.BusinessRouter = router;
