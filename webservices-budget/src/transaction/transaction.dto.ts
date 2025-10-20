// src/transactions/transaction.dto.ts
import { PlaceResponseDto } from '../place/place.dto';
import { UserResponseDto } from '../user/user.dto';

export class TransactionResponseDto {
  id: number;
  amount: number;
  date: Date;
  user: UserResponseDto;
  place: PlaceResponseDto;
}
