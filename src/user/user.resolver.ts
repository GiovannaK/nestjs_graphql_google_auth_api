import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(data);
    return user;
  }
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
