import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidV4 } from 'uuid';
import url from 'url';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const a = url.parse(req.originalUrl);
    if (!req.headers['x-session-id']) req.headers['x-session-id'] = uuidV4();

    let message = `${req.method.toUpperCase()} ${req.originalUrl + a}`;
    message += `, sessionId: ${req.headers['x-session-id']}`;
    message += `, data: ${req.body ? JSON.stringify(req.body) : '{}'}`;
    Logger.log(message, 'Request In');

    next();
  }
}
