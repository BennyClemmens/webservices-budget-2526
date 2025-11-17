import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { Role } from '../auth/roles';
import { Expose } from 'class-transformer';

export class UserListResponseDto {
  items: PublicUserResponseDto[];
}

export class PublicUserResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;
}

export class CreateUserRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
  email: string;
  passwordHash: string;
  roles: Role[];
}

export class UpdateUserRequestDto extends CreateUserRequestDto {}
