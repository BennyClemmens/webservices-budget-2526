// src/transactions/transaction.dto.ts
import { PlaceResponseDto } from '../place/place.dto';
import { UserResponseDto } from '../user/user.dto';

export class TransactionListResponseDto {
  items: TransactionResponseDto[];
}

export class TransactionResponseDto {
  id: number;
  amount: number;
  date: Date;
  user: UserResponseDto;
  place: PlaceResponseDto;
}

export class CreateTransactionRequestDto {
  amount: number;
  date: Date;
  userId: number;
  placeId: number;
}

export class UpdateTransactionRequestDto extends CreateTransactionRequestDto {}
