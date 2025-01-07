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
exports.GoogleStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const google_user_schema_1 = require("../modules/google-user/schemas/google-user.schema");
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor(googleUserModel) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ['profile', 'email'],
            passReqToCallback: true,
        });
        this.googleUserModel = googleUserModel;
    }
    async validate(request, accessToken, refreshToken, profile, done) {
        try {
            const googleId = profile.id;
            const emails = profile.emails || [];
            const photos = profile.photos || [];
            const displayName = profile.displayName || '';
            const email = emails.length ? emails[0].value : '';
            const firstName = profile.name?.givenName || '';
            const lastName = profile.name?.familyName || '';
            const photo = photos.length ? photos[0].value : '';
            if (!googleId) {
                console.error('No Google ID in profile, cannot proceed');
                return done(null, false);
            }
            let user = await this.googleUserModel.findOne({ googleId });
            if (!user) {
                user = await this.googleUserModel.create({
                    googleId,
                    email,
                    displayName,
                    firstName,
                    lastName,
                    photo,
                });
            }
            return done(null, user);
        }
        catch (err) {
            console.error('Error in Google Strategy:', err);
            return done(err, false);
        }
    }
};
exports.GoogleStrategy = GoogleStrategy;
exports.GoogleStrategy = GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(google_user_schema_1.GoogleUser.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GoogleStrategy);
//# sourceMappingURL=google.strategy.js.map