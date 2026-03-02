import { Module } from '@nestjs/common';
import { CompressorService } from './compressor.service';
import { CompressorContract } from './compressor.contract';
import { CompressorRepository } from './compressor.repository';
import { CompressorController } from './compressor.controller';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { FeatureFlagModule } from '../featureFlag/feature-flag.module';
import { S3Module } from 'src/aws/s3/aws.s3.module';

@Module({
  providers: [
    CompressorService,
    {
      provide: CompressorContract,
      useClass: CompressorRepository
    }
  ],
  imports: [
    PrismaModule,
    FeatureFlagModule,
    S3Module,
  ],
  controllers: [CompressorController]
})
export class CompressorModule { }
