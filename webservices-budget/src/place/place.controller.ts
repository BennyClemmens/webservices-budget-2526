import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreatePlaceRequestDto } from './place.dto';

@Controller('places')
export class PlaceController {
  @Get()
  getAllPlaces(): string {
    return 'this action returns all places';
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
}
