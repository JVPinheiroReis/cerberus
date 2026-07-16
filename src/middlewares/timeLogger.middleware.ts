import type { NextFunction, Request, Response } from "express";

export const timeLogger = (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	const dateTime = new Date();
	console.log(
		`${dateTime.toUTCString()}\t${req.ip}\t${req.method}\t${req.url}`,
	);
	next();
};
