import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  @Length(1, 200)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(8, 200)
  password: string;
}
