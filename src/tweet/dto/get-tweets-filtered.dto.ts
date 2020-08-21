import { IsOptional } from 'class-validator';

export default class GetTweetsFilteredDTO {
  @IsOptional()
  search: string;
}
