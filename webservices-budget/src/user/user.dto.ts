import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { Role } from '../auth/roles';

export class UserListResponseDto {
  items: UserResponseDto[];
}

export class UserResponseDto {
  id: number;
  name: string;
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
