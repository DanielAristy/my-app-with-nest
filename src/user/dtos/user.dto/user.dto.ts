import { User } from "src/user/interfaces/user/user.interface";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { v4 as uuid } from 'uuid';

export class UserDto implements User {
    @IsUUID()
    @IsOptional()
    uuid?: string;
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    surname: string;
    @IsString()
    @IsNotEmpty()
    email: string;

    constructor(user?: User){
        this.uuid = user?.uuid ?? uuid();
        this.name = user?.name ?? '';
        if (user?.surname) this.surname = user?.surname;
        this.email = user?.email ?? '';
    }
}
