import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CompressorContract } from './compressor.contract';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { StoreCompressions, UserCompressions } from './types/compressor.types';


@Injectable()
export class CompressorRepository implements CompressorContract {
  constructor(
    private prismaService: PrismaService
  ) { }

  async storeCompression(payload: StoreCompressions): Promise<string> {
    const compression = await this.prismaService.compression.create({
      data: {
        s3Key: payload.s3Key,
        userId: payload.userId,
        ext: payload.mimetype,
        originalName: payload.filename,
      }
    })
    return compression.id;
  }

  async getS3KeyById(userId: string, compressionId: string) {
    const key = await this.prismaService.compression.findUnique({
      where: {
        id: compressionId,
        userId: userId
      },
      select: {
        s3Key: true
      }
    })
    if (key?.s3Key) {
      return key.s3Key
    }
    return "";
  }

  async getUserCompressionsById(userId: string): Promise<UserCompressions[]> {
    const userCompressions: UserCompressions[] = await this.prismaService.compression.findMany({
      where: {
        userId: userId
      },
      select: {
        //As long as this variable is typed, all fields that isnt especified by the type will be ignored and not included
        id: true,
        originalName: true,
        status: true,
      }
    })
    return userCompressions;
  }
}
