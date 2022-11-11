import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {
        console.log('Entro al Guard');
        let token = '99e4c497d8b4c049ce41e71ff04055adc01714bccdf2f901e4c1d16ffabcef571398fa2b416ddc1037a98c4040c2f277c1bbb2dbc647ed65a2acaf657ac229ec';
        const auth = context.switchToHttp().getRequest().headers.authorization;

        if (auth && token.includes(auth.split(' ')[1])) return true;
        else return false;
    }
}