import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UpdateUserDto {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  email: string;
}
