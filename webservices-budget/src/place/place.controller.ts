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
import {
  CreatePlaceRequestDto,
  PlaceListResponseDto,
  PlaceDetailResponseDto,
  UpdatePlaceRequestDto,
} from './place.dto';
import { PlaceService } from './place.service';

@Controller('places')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get()
  // async getAllPlaces(
  //   @Query() paginationQuery: PaginationQuery,
  // ): Promise<PlaceListResponseDto> {
  async getAllPlaces(): Promise<PlaceListResponseDto> {
    //const { page, limit } = paginationQuery;
    return this.placeService.getAll();
  }

  @Get(':id')
  async getPlaceById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PlaceDetailResponseDto> {
    return this.placeService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPlace(
    @Body() createPlaceRequestDto: CreatePlaceRequestDto,
  ): Promise<PlaceDetailResponseDto> {
    return this.placeService.create(createPlaceRequestDto);
  }

  @Put(':id')
  async updatePlace(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlaceRequestDto: UpdatePlaceRequestDto,
  ): Promise<PlaceDetailResponseDto> {
    return this.placeService.updateById(id, updatePlaceRequestDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePlace(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.placeService.deleteById(id); // await redundant...
  }
}
