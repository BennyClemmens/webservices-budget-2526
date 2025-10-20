import { TransactionResponseDto } from '../transaction/transaction.dto';
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

export class PlaceDetailResponseDto extends PlaceResponseDto {
  transactions: TransactionResponseDto[];
}
