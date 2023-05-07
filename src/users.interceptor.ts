import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class UsersInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                if (!data) {
                    return data;
                }
                data = JSON.parse(JSON.stringify(data));
                if (data.length) {
                    data = data.map((user) => {
                        user.password = undefined;
                        return user;
                    });
                } else {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { password, ...newData } = data;
                    return newData;
                }
                return data;
            }),
        );
    }
}
