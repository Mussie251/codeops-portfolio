import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable, tap } from 'rxjs';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const start = Date.now();
    const request = context.switchToHttp().getRequest();

    console.log(`Started: ${request.method} ${request.url}`);

    return next.handle().pipe(
      tap(() => {
        console.log(`Completed in ${Date.now() - start}ms`);
      }),
    );
  }
}