import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    const users = await this.userModel.find({ isDeleted: false });
    return users;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id, isDeleted: false });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const user = this.userModel.create(data);

    if (!user) {
      throw new InternalServerErrorException('Could not create user');
    }
    return user;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        {
          _id: id,
        },
        { $set: data },
        { new: true },
      )
      .exec();
    if (!updatedUser) {
      throw new InternalServerErrorException('Cannot update user');
    }

    return updatedUser;
  }

  async deleteUser(id: string) {
    const removeUser = await this.userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          isDeleted: true,
        },
      },
    );

    if (!removeUser) {
      throw new InternalServerErrorException('Cannot delete user');
    }

    return removeUser;
  }
}
