import { HttpError } from "./HttpError.js";
export const errorHandler = (err, req, res, next) => {
    if (err instanceof HttpError)
        res.status(err.status).send(err.message);
    else
        console.error(err);
    res.status(500).send("Unknown server error");
};
