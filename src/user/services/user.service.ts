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
     throw new NotFoundException(`No existe usuario con uuid: ${uuid}`)
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

  updateUser(uuid: string, userDto: UserDto){
    const updateUser = this.findById(uuid);
    if (updateUser) {
      const index = this.users.findIndex((userData) => uuid.includes(userData.uuid ?? ''));
      this.users[index] = {...updateUser, ...userDto};
      return this.users[index];
    }
  }

  modifyUser(uuid: string, userDto: UserDto){
    return this.updateUser(uuid, userDto)
  }

  deleteUser(id: string): boolean { 
    const index = this.users.findIndex((user) => id.includes(user.uuid ?? ''))
    if (index == -1) {
      throw new NotFoundException(`No existe usuario con uuid: ${id}`)
    }
    this.users.splice(index, 1)
    return true;
  }
}
