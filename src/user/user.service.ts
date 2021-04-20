import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private  userModel: Model<UserDocument>) {}

  async create(userDto: UserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  async getAll() : Promise<User[]>{
    return this.userModel.find();
}

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id);  
  }

  async validateUser(email: string, pass : string): Promise<User> {
    const account = await this.userModel.findOne({email}).exec();       

    if(!account || account.password != pass)
        return null;

    const {password, ...rest} = account;

    return account;
}
}
