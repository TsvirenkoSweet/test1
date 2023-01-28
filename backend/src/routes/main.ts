import { Request, Response } from "express";
import { mockData } from '../helper/emulatePromise';
const { Router } = require('express');

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const data = await mockData();
    return res.json(data);
})

export default router;