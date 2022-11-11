import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class HttpBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Body:', req.body);
    if (req.params.uuid != undefined) console.log('Params:' ,req.params);
    next();
  }
}