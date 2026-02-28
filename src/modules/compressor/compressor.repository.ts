import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CompressorContract } from './compressor.contract';
import { InjectQueue } from '@nestjs/bullmq';
import { FeatureFlagService } from '../flagsmith/flagsmith.service';
import { Flags } from '../flagsmith/types';
import { RequestS3UploadDto } from "./dtos/compressor.dto"
import { S3Service } from 'src/aws/s3/aws.s3.service';
import { PrismaService } from 'src/database/prisma/prisma.service';


@Injectable()
export class CompressorRepository implements CompressorContract {
  constructor(
    private prismaService: PrismaService
  ) { }

  async storeCompression(s3Key: string, userId: string): Promise<void> {
    await this.prismaService.compression.create({
      data: {
        s3Key: s3Key,
        userId: userId,
        compressedSize: 1,
        ext: ".mp4",
        originalName: "teste",
        originalSize: 2,
        preset: "low",
      }
    })
  }

  async getDestinationById(userId: string, compressionId: string) {
    const key = await this.prismaService.compression.findUnique({
      where: {
        id: compressionId,
        userId: userId
      }
    })
    if (!key) {
      throw new NotFoundException()
    }
    return key.s3Key
  }
}
