import { PartialType }                   from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ComparablePassword }            from '../../../../shared/utility.types';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: ComparablePassword;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

