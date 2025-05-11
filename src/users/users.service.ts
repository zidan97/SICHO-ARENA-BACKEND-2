import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password !== createUserDto.confirm) {
      throw new Error('Password and confirm password do not match');
    }

    const { password, confirm, ...userData } = createUserDto;

    const user = new this.userModel({
      ...userData,
    });
    return await user.save();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  // async findOne(id: string): Promise<User> {
  //   const user = await this.userModel.findById(id).exec();
  //   if (!user) {
  //     throw new Error('User not found');
  //   }
  //   return user;
  // }
  async findPersonByEmail(email: string) {
    const user = await this.userModel.find({ email }).exec();
    if (user.length === 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User information is not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async remove(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
