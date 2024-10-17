import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { version } from '../../../package.json';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const req = context.switchToHttp().getRequest();

        const transformedResponse = {
          error: null,
          data: data.data,
          meta: {
            version,
            ...data.meta,
          },
        };

        let message = `${req.method.toUpperCase()} ${req.originalUrl}`;
        message += `, sessionId: ${req.headers['x-session-id']}`;
        message += `, response: ${JSON.stringify(transformedResponse)}`;

        Logger.log(message, 'Response Out');
        return transformedResponse;
      }),
    );
  }
}
