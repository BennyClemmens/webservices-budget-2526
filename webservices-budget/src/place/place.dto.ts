// src/place/plac.dto.ts
export class CreatePlaceRequestDto {
  name: string;
  rating: number;
}

export class UpdatPlaceRequestDto extends CreatePlaceRequestDto {}
