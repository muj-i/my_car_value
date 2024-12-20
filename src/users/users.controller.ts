import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { UserDto } from 'src/users/dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller()
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('auth/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body);
    session.userId = user.id;
    return user;
  }

  @Post('auth/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('auth/signout')
  signout(@Session() session: any) {
    session.userId = null;
    return 'You have been signed out';
  }

  @Get('user/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get('user')
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('user/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('user/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  // @Get('whoami')
  // whoAmI(@Session() session: any) {
  //   if (!session.userId) {
  //     throw new BadRequestException('You are not logged in');
  //   }
  //   return this.usersService.findOne(session.userId);
  // }

  @UseGuards(AuthGuard)
  @Get('whoami')
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
  // @Get('color/:color')
  // setColor(@Param('color') color: string, @Session() session: any) {
  //   session.color = color;
  // }

  // @Get('color')
  // getColor(@Session() session: any) {
  //   return session.color;
  // }
}
