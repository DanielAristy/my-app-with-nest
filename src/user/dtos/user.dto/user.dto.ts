import { User } from "src/user/interfaces/user/user.interface";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { v4 as uuid } from 'uuid';
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";

export class UserDto implements User {
    @IsUUID()
    @IsOptional()
    @ApiProperty({description: "Se auto genera, no es necesario enviarlo"})
    @ApiPropertyOptional()
    uuid: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: "Nombre de la persona"})
    name: string;
    @IsString()
    @IsOptional()
    @ApiProperty({description: "Apellido de la persona"})
    @ApiPropertyOptional()
    surname?: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: "Correo personal"})
    email: string;

    constructor(user?: User){
        this.uuid = user?.uuid ?? uuid();
        this.name = user?.name ?? '';
        if (user?.surname) this.surname = user?.surname;
        this.email = user?.email ?? '';
    }
}

export class UpdateUserDto extends PartialType(UserDto){}