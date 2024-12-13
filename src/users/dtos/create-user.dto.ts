import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;
}
