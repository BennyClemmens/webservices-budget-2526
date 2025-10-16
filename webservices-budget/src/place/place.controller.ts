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
  Query,
} from '@nestjs/common';
import { CreatePlaceRequestDto, UpdatPlaceRequestDto } from './place.dto';
import { PaginationQuery } from '../common/common.dto';

@Controller('places')
export class PlaceController {
  @Get()
  getAllPlaces(@Query() paginationQuery: PaginationQuery): string {
    const { page = 1, limit = 10 } = paginationQuery;
    return `this action returns all places. Limit ${limit}, page: ${page}`;
  }

  @Get(':id')
  getPlaceById(@Param('id') id: string): string {
    return `This action returns a #${id} place`;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createPlace(@Body() createPlaceRequestDto: CreatePlaceRequestDto): string {
    return `This action adds a new place for ${createPlaceRequestDto.name}`;
  }

  @Put(':id')
  updatePlace(
    @Param('id') id: string,
    @Body() updatPlaceRequestDto: UpdatPlaceRequestDto,
  ): string {
    return `This action update the place ${updatPlaceRequestDto.name} with is #${id}`;
  }

  @Delete(':id')
  deletePlace(@Param('id') id: string): string {
    return `This action removes the place with id #${id}`;
  }
}
