import { PipeTransform, BadRequestException } from '@nestjs/common';
import UpdateTweetDTO from '../dto/update-tweet.dto';

export default class UpdateTweetValidationPipe implements PipeTransform {
  private readonly allowedFields = ['media_url', 'text'];

  private isValidField(allowedFields: string[], field: string): boolean {
    if (allowedFields.includes(field)) {
      return true;
    }
    return false;
  }

  transform(updateTweetDTO: UpdateTweetDTO) {
    if (!this.isValidField(this.allowedFields, updateTweetDTO.field)) {
      throw new BadRequestException(
        `${updateTweetDTO.field} is not a valid field`
      );
    }
    return updateTweetDTO;
  }
}
