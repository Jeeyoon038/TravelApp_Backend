// src/modules/trips/trips.controller.ts
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { Trip } from './schemas/trip.schema';
import { TripsService } from './trips.service';


@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {
    console.log('TripsController initialized');
  }

  @Get()
  async findAll() {
    console.log('GET /trips endpoint hit');
    try {
      const trips = await this.tripsService.findAll();
      console.log('Successfully retrieved trips:', trips);
      return trips;
    } catch (error) {
      console.error('Error in findAll controller:', error);
      throw error;
    }
  }
  @Get(':tripId/metadata')
  async getTripMetadata(@Param('tripId') tripId: number) {
    try {
      // 1. tripId로 Trip 정보 가져오기
      const trip = await this.tripsService.findOne(tripId);
      if (!trip) {
        throw new BadRequestException('Trip not found');
      }

      // 2. Trip의 image_urls를 기반으로 메타데이터 조회
      const metadata = await Promise.all(
        trip.image_urls.map((url) =>
          this.imageMetadataService.findByImageUrl(url),
        ),
      );

      return {
        trip,
        metadata: metadata.filter((meta) => meta !== null), // 유효한 메타데이터만 반환
      };
    } catch (error) {
      console.error('Error fetching trip metadata:', error);
      throw new BadRequestException('Failed to fetch trip metadata');
    }
  }

  @Get('test')
  test() {
    console.log('Test endpoint hit');
    return { message: 'Trips endpoint is working' };
  }

  @Post()
  async create(@Body() createTripDto: CreateTripDto) {
    console.log('Received trip data:', createTripDto);  // Log the received data (check files URL)
    return this.tripsService.create(createTripDto);
  }
 


  //여행 데이터 하나 가져오기 (Id로 조회)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Trip> {
    return this.tripsService.findOne(id);
  }

  @Patch(':tripId/add-member')
  async addMember(@Param('tripId') tripId: string, @Body() body: { googleEmail: string }) {
    const { googleEmail } = body;
    return this.tripsService.addMember(tripId, googleEmail);
  }

}