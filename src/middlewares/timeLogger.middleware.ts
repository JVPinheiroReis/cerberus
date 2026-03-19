import type { NextFunction, Request, Response } from "express";

export const timeLogger = (req: Request, res: Response, next: NextFunction) => {
	const dateTime = new Date();
	console.log(`${dateTime.toUTCString()}\t${req.url}`);
	next();
};
