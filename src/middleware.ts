import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateJWT = (
	req: Request,
	res: Response,
	next: Function,
) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (token) {
		jwt.verify(
			token,
			process.env.JWT_SECRET as string,
			(err: any, user: any) => {
				if (err) {
					return res.sendStatus(403);
				}
				// req.user = user;
				next();
			},
		);
	} else {
		res.sendStatus(401);
	}
};
