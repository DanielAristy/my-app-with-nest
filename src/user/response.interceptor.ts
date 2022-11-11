import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { UserDto } from "./dtos/user.dto/user.dto";

@Injectable()
export class Interceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>  {
        console.log('Entro en el Interceptor');
        return next.handle().pipe(
            tap((payload) => {
                    if (payload.surname == undefined) {
                        payload.surname = 'null';
                    }

                    if (payload.length > 0) {
                        payload.map((user: UserDto) => {
                            if (user.surname == undefined) user.surname = 'null';
                        })
                    }
                }
            )
        );
    }
}