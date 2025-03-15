import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction  } from "express";
import { verifyToken } from "src/unils/profile";

@Injectable()
export class VerifyMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).send('Unauthorized');
    }
    const verify = await verifyToken(token);
    if (!verify) {
      res.status(401).send('Unauthorized');
    }
    next();
  }
  
}