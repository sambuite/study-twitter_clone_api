import { IsNotEmpty } from 'class-validator';
export default class CreateTweetDTO {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  media_url: string;
}
