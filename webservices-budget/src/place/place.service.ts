import { Injectable } from '@nestjs/common';
import { Place, PLACES } from '../data/mock_data';
import {
  CreatePlaceRequestDto,
  UpdatePlaceRequestDto,
  PlaceListResponseDto,
  PlaceResponseDto,
} from './place.dto';

@Injectable()
export class PlaceService {
  getAll(): PlaceListResponseDto {
    return { items: PLACES };
  }

  getById(id: number): PlaceResponseDto | undefined {
    return PLACES.find((item: Place) => item.id === id);
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
  ): PlaceResponseDto | undefined {
    const index = PLACES.findIndex((item: Place) => item.id === id);
    if (index === -1) return undefined;

    const updatedPlace = { ...PLACES[index], name, rating };
    PLACES[index] = updatedPlace;

    return updatedPlace;
  }

  deleteById(id: number): void {
    const index = PLACES.findIndex((item: Place) => item.id === id);
    if (index >= 0) {
      PLACES.splice(index, 1);
    }
  }
}
