import { NextFunction, Request, Response } from "express";
import { HttpError } from "./HttpError.ts";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpError) 
        res.status(err.status).send(err.message);
    else 
        console.error(err);
        res.status(500).send("Unknown server error");
} 