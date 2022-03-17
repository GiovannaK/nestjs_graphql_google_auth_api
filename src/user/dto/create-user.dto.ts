import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
@ArgsType()
export class CreateUserDto {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  email: string;
}
