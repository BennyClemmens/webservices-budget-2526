// src/place/plac.dto.ts
class PlaceDto {
  name: string;
  rating: number;
}

export class CreatePlaceRequestDto extends PlaceDto {}

export class UpdatePlaceRequestDto extends PlaceDto {}

export class PlaceResponseDto extends PlaceDto {
  id: number;
}

export class PlaceListResponseDto {
  items: PlaceResponseDto[];
}
