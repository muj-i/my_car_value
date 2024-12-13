import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    // const user = await this.repo.findBy({ email: createUserDto.email });
    // if (user.length > 0) {
    //   throw new BadRequestException('User already exists');
    // }

    if (createUserDto.name === null || createUserDto.name === undefined) {
      createUserDto.name = '';
    }
    const newUser = this.repo.create({ ...createUserDto });
    return this.repo.save(newUser);
  }

  async findOne(id: number): Promise<User> {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async find(email: string): Promise<User[]> {
    const user = await this.repo.findBy({ email: email });
    // if (user.length === 0) {
    //   throw new NotFoundException('User not found');
    // }
    return user;
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const success = await this.repo.remove(user);
    if (!success) {
      throw new BadRequestException('User not removed');
    } else {
      return { success: true, message: 'User removed' };
    }
  }
}
