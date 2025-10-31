import { TransactionResponseDto } from '../transaction/transaction.dto';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  Min,
  Max,
  IsInt,
} from 'class-validator';

class PlaceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsInt()
  @Min(1)
  @Max(5)
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
