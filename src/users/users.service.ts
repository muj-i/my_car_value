import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    if (createUserDto.name === null || createUserDto.name === undefined) {
      createUserDto.name = '';
      const user = this.repo.create({ ...createUserDto });
      return this.repo.save(user);
    }
  }
}
