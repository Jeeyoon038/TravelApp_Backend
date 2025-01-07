import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    addFollowing(userId: string, followingId: string): Promise<User>;
    removeFollowing(userId: string, followingId: string): Promise<User>;
    migrateGoogleUsers(googleUsers: {
        googleId: string;
        email: string;
        name: string;
        profilePicture?: string;
    }[]): Promise<void>;
}
