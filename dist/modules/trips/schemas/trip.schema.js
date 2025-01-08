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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripSchema = exports.Trip = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Trip = class Trip {
};
exports.Trip = Trip;
__decorate([
    (0, mongoose_1.Prop)({ unique: true }),
    __metadata("design:type", Number)
], Trip.prototype, "trip_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Trip.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Date }),
    __metadata("design:type", Date)
], Trip.prototype, "start_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Date }),
    __metadata("design:type", Date)
], Trip.prototype, "end_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Trip.prototype, "image_urls", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Trip.prototype, "member_google_ids", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Trip.prototype, "created_by", void 0);
exports.Trip = Trip = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Trip);
exports.TripSchema = mongoose_1.SchemaFactory.createForClass(Trip);
exports.TripSchema.pre('save', async function (next) {
    if (this.isNew) {
        const Trip = this.constructor;
        const lastTrip = await Trip.findOne().sort({ trip_id: -1 });
        this.trip_id = lastTrip ? lastTrip.trip_id + 1 : 1;
    }
    next();
});
exports.TripSchema.pre('save', function (next) {
    if (this.end_date < this.start_date) {
        next(new Error('End date must be after start date'));
    }
    next();
});
//# sourceMappingURL=trip.schema.js.map