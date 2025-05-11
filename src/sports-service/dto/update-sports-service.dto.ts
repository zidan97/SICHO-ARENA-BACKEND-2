import { PartialType } from '@nestjs/mapped-types';
import { CreateSportsServiceDto } from './create-sports-service.dto';

export class UpdateSportsServiceDto extends PartialType(
  CreateSportsServiceDto,
) {}
