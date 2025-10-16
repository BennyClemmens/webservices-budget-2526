import { Controller, Get, Param } from '@nestjs/common';

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
}
