import { Response } from "express";

export const statusMessage = {
    badRequest: (res: Response, message: string) => res.status(400).json({message}),
    notFound: (res: Response, message: string) => res.status(404).json({message}),
}