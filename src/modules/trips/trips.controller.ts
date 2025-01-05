// src/modules/trips/trips.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { Trip } from './schemas/trip.schema';
import { FilesInterceptor } from '@nestjs/platform-express';
import { s3Client } from '../../config/aws.config';
import * as AWS from '@aws-sdk/client-s3';


@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  // @Post()
  // async create(@Body() createTripDto: CreateTripDto): Promise<Trip> {
  //   return this.tripsService.create(createTripDto);
  // }

  // @Post()
  // @UseInterceptors(FilesInterceptor('files', 10))  // 'files' is the field name for the file input
  // async create(@Body() createTripDto: CreateTripDto, @UploadedFiles() files: Express.Multer.File[]) {
  //   if (!files || files.length === 0) {
  //     // Handle case where no files are uploaded
  //     console.log("No files uploaded");
  //     return { message: "No files uploaded" };
  //   }

  //   // Process files and form data
  //   const filePaths = files.map(file => file.path);  // Extract the file paths
  //   const tripData = { ...createTripDto, files: filePaths };  // Attach file paths to the DTO

  //   return this.tripsService.create(tripData);  // Call the service to save the trip
  // }

  @Post()
  async create(@Body() createTripDto: CreateTripDto) {
    console.log('Received trip data:', createTripDto);  // Log the received data (check files URL)
    return this.tripsService.create(createTripDto);
  }
  @Get()
  async findAll(): Promise<Trip[]> {
    return this.tripsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Trip> {
    return this.tripsService.findOne(id);
  }



//   @Post('test/create')
//   async testCreate() {
//   const testTrip = {
//     title: "Test Trip",
//     start_date: new Date("2025-01-01"),
//     end_date: new Date("2025-01-07")
//   };
//   return this.tripsService.create(testTrip);
// }

}