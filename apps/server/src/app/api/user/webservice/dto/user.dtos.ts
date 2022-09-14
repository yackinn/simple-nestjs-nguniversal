import { ICreateUserDto }                from '@nestjs-angular-talk/core/domain';
import { PartialType }                   from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ComparablePassword }            from '../../../../shared/utility.types';

export class CreateUserDto implements ICreateUserDto {
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

