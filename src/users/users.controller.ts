import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserDto } from 'src/users/dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get('/user/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get('/user')
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('/user/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/user/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
