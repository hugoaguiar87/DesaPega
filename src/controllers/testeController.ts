import { Request, Response } from "express";
import dotenv from 'dotenv';

dotenv.config()
 
export const pong = (req: Request, res: Response) => {
    
    res.json({pong: 'pingou no novo  !'})
}

