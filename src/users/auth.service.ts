import { BadRequestException, Injectable } from '@nestjs/common';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(createUserDto: CreateUserDto) {
    // see if email is in use
    const users = await this.usersService.find(createUserDto.email);
    if (users.length) {
      throw new BadRequestException('Email already exists');
    }

    // hash the users password
    // generate a new salt
    const salt = randomBytes(8).toString('hex');
    // hash the password with the salt
    const hash = (await scrypt(createUserDto.password, salt, 32)) as Buffer;
    // join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // create a new user and save it
    createUserDto.password = result;
    const user = await this.usersService.create(createUserDto);

    // return the user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    console.log(user);
    if (!user) {
      throw new BadRequestException('Invalid email');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid password');
    }

    return user;
  }
}
