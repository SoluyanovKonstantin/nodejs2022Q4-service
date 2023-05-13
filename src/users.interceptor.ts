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
                if (Array.isArray(data)) {
                    data = data.map((user) => {
                        user.password = undefined;
                        user.createdAt = +user.createdAt;
                        user.updatedAt = +user.updatedAt;
                        return user;
                    });
                } else {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { password, ...newData } = data;
                    newData.createdAt = +newData.createdAt;
                    newData.updatedAt = +newData.updatedAt;
                    return newData;
                }
                return data;
            }),
        );
    }
}
