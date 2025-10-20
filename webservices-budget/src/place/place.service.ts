import { Injectable, NotFoundException } from '@nestjs/common';
import { Place, PLACES } from '../data/mock_data';
import {
  CreatePlaceRequestDto,
  UpdatePlaceRequestDto,
  PlaceListResponseDto,
  PlaceResponseDto,
} from './place.dto';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';

@Injectable()
export class PlaceService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll(): Promise<PlaceListResponseDto> {
    const items = await this.db.query.places.findMany();
    return { items };
  }

  getById(id: number): PlaceResponseDto {
    const place = PLACES.find((item: Place) => item.id === id);
    if (!place) {
      throw new NotFoundException(`No place with this id exists`);
    }
    return place;
  }

  create({ name, rating }: CreatePlaceRequestDto): PlaceResponseDto {
    const newplace = {
      id: Math.max(...PLACES.map((item: Place) => item.id)) + 1,
      name,
      rating,
    };
    PLACES.push(newplace);
    return newplace;
  }

  updateById(
    id: number,
    { name, rating }: UpdatePlaceRequestDto,
  ): PlaceResponseDto {
    let existingplace = this.getById(id);
    if (existingplace) {
      existingplace = { id: id, name, rating };
    }
    PLACES[PLACES.findIndex((item: Place) => item.id === id)] = existingplace;
    return existingplace;
  }

  deleteById(id: number): void {
    this.getById(id);
    const index = PLACES.findIndex((item: Place) => item.id === id);
    if (index >= 0) {
      PLACES.splice(index, 1);
    }
  }
}
