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
exports.TripsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const trip_schema_1 = require("./schemas/trip.schema");
let TripsService = class TripsService {
    constructor(tripModel) {
        this.tripModel = tripModel;
    }
    async create(createTripDto) {
        const tripData = {
            ...createTripDto,
            start_date: new Date(createTripDto.start_date),
            end_date: new Date(createTripDto.end_date)
        };
        const createdTrip = new this.tripModel(tripData);
        return createdTrip.save();
    }
    async findAll() {
        try {
            console.log('Fetching all trips from database');
            const trips = await this.tripModel.find().sort({ trip_id: -1 }).exec();
            console.log('Found trips:', trips);
            return trips;
        }
        catch (error) {
            console.error('Error in findAll service:', error);
            throw error;
        }
    }
    async addMember(tripId, googleEmail) {
        const googleUser = await this.GoogleUserService.findByEmail(googleEmail);
        const trip = await this.tripModel.findById(tripId).exec();
        if (!trip) {
            throw new common_1.NotFoundException(`Trip with ID ${tripId} not found`);
        }
        if (!trip.member_google_ids.includes(googleUser.googleId)) {
            trip.member_google_ids.push(googleUser.googleId);
            await trip.save();
        }
        else {
            console.log(`GoogleId ${googleUser.googleId} is already a member of Trip ${tripId}`);
        }
        return trip;
    }
    async findOne(trip_id) {
        return this.tripModel.findOne({ trip_id }).exec();
    }
};
exports.TripsService = TripsService;
exports.TripsService = TripsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(trip_schema_1.Trip.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TripsService);
//# sourceMappingURL=trips.service.js.map