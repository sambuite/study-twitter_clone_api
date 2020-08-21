import { IsNotEmpty } from 'class-validator';

export default class UpdateTweetDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  field: Field;

  @IsNotEmpty()
  fieldValue: string;
}

export enum Field {
  MEDIA_URL = 'media_url',
  TEXT = 'text',
}
