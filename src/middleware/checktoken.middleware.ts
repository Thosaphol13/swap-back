import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
//import { verifyToken } from 'src/utils/profile';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './jwtConstants';

@Injectable()
export class VerifyMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).send('Unauthorized');
    }
    try {
      const secretKey = jwtConstants.secret;
      const decoded = jwt.verify(token, secretKey);
      console.log(decoded);
      next();
    } catch (err) {
      return res.status(401).send('Unauthorized');
    }
  }
}
