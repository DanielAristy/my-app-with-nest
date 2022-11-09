import { Injectable,NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UserDto } from '../dtos/user.dto/user.dto';
import { User } from '../interfaces/user/user.interface';

@Injectable()
export class UserService {
  private users: User[] = [
    {uuid: uuid(),
      name: 'Jorge',
      surname: 'Gomez',
      email: 'jorge@gmail.com'   
    },
    {uuid: uuid(),
      name: 'Jario',
      surname: 'Ramirez',
      email: 'jairo@gmail.com'   
    },
    {uuid: uuid(),
      name: 'Jose',
      surname: 'Lopez',
      email: 'jose@gmail.com'   
    },
  ]

  findAll(): User[] {
    return this.users;
  }

  findById(uuid: string) {
    const user = this.users.find(user => user?.uuid === uuid)
    if (!user) {
     throw new NotFoundException(`No existe usuario con uuid: ${uuid.toString()}`)
    }
    return user
  }

  createUser(user: UserDto){
    const newUser ={
      uuid: uuid(),
      ...user
    }
    this.users.push(newUser);
    return newUser;
  }

  deleteUser(id: string): boolean { 
    const user = this.findById(id);
    let valid = false;
    if (user) {
      this.users.find((userData, i) => {
        if (user.uuid === userData?.uuid) {
          delete this.users[i]
          valid = true;
        }
      })
    } else valid = false;

    return valid;
  }
}
