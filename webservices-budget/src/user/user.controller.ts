import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { PlaceService } from '../place/place.service';
import { PlaceListResponseDto } from '../place/place.dto';
import {
  CreateUserRequestDto,
  UpdateUserRequestDto,
  UserListResponseDto,
  PublicUserResponseDto,
} from './user.dto';
import { UserService } from './user.service';
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private placeService: PlaceService,
  ) {}

  @Get()
  async getAllUsers(): Promise<UserListResponseDto> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PublicUserResponseDto> {
    return this.userService.getById(id);
  }

  @Post()
  async createUser(
    @Body() dto: CreateUserRequestDto,
  ): Promise<PublicUserResponseDto> {
    return this.userService.create(dto);
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<PublicUserResponseDto> {
    return this.userService.updateById(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.deleteById(id);
  }

  @Get('/:id/favoriteplaces')
  async getFavoritePlaces(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PlaceListResponseDto> {
    return await this.placeService.getFavoritePlacesByUserId(id);
  }
}
