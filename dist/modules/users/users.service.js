"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }
    async findAll() {
        return this.userModel.find().exec();
    }
    async findOne(id) {
        return this.userModel.findById(id).exec();
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async addFollowing(userId, followingId) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new Error('User not found');
        if (!user.following.includes(followingId)) {
            user.following.push(followingId);
            await user.save();
        }
        return user;
    }
    async removeFollowing(userId, followingId) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new Error('User not found');
        user.following = user.following.filter((id) => id.toString() !== followingId);
        await user.save();
        return user;
    }
    async migrateGoogleUsers(googleUsers) {
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map