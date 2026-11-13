
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Min,
  MinLength,
} from "class-validator";

import { AREAS } from "../order.types.js";

export class CreateOrderDto {
  @IsString()
  @MinLength(1)
  customerName!: string;

  @IsIn(AREAS)
  area!: (typeof AREAS)[number];

  @IsInt()
  @Min(1)
  totalSantim!: number;

  @IsOptional()
  @IsString()
  @Matches(/^(?:\+251|0)9\d{8}$/)
  telebirrPhone?: string;
}
