import { Controller, Get } from '@nestjs/common';

@Controller('places')
export class PlaceController {
  @Get()
  getAllPlaces(): string {
    return 'this action returns all places';
  }
}
