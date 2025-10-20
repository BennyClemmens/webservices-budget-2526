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
import {
  CreatePlaceRequestDto,
  PlaceListResponseDto,
  PlaceResponseDto,
  UpdatePlaceRequestDto,
} from './place.dto';
import { PaginationQuery } from '../common/common.dto';
import { PlaceService } from './place.service';

@Controller('places')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get()
  async getAllPlaces(
    @Query() paginationQuery: PaginationQuery,
  ): Promise<PlaceListResponseDto> {
    const { page = 1, limit = 10 } = paginationQuery;
    console.log(`TODO: implement pagination: page: $${page}, limit: ${limit}`);

    return this.placeService.getAll();
  }

  @Get(':id')
  getPlaceById(@Param('id') id: string): PlaceResponseDto {
    return this.placeService.getById(Number(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createPlace(
    @Body() createPlaceRequestDto: CreatePlaceRequestDto,
  ): PlaceResponseDto {
    return this.placeService.create(createPlaceRequestDto);
  }

  @Put(':id')
  updatePlace(
    @Param('id') id: string,
    @Body() updatePlaceRequestDto: UpdatePlaceRequestDto,
  ): PlaceResponseDto {
    return this.placeService.updateById(Number(id), updatePlaceRequestDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deletePlace(@Param('id') id: string): void {
    this.placeService.deleteById(Number(id));
  }
}
