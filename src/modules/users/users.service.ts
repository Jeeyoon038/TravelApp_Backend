import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async addFollowing(userId: string, followingId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new Error('User not found');

    if (!user.following.includes(followingId as any)) {
      user.following.push(followingId as any);
      await user.save();
    }
    return user;
  }

  // Remove a user from the following list
  async removeFollowing(userId: string, followingId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new Error('User not found');

    user.following = user.following.filter((id) => id.toString() !== followingId);
    await user.save();
    return user;
  }

  // Migrate GoogleUser data to the User schema
  async migrateGoogleUsers(googleUsers: {
    googleId: string;
    email: string;
    name: string;
    profilePicture?: string;
  }[]): Promise<void> {
    for (const googleUser of googleUsers) {
      const existingUser = await this.userModel.findOne({ googleId: googleUser.googleId });

      if (!existingUser) {
        const newUser = new this.userModel({
          googleId: googleUser.googleId,
          email: googleUser.email,
          name: googleUser.name,
          profilePicture: googleUser.profilePicture,
          following: [],
        });

        await newUser.save();
        console.log(`Created user for GoogleUser ID: ${googleUser.googleId}`);
      }
    }
  }
}