import { Injectable, NotFoundException } from '@nestjs/common';
import { CompressorContract } from './compressor.contract';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UserCompressions } from './types/compressor.types';


@Injectable()
export class CompressorRepository implements CompressorContract {
  constructor(
    private prismaService: PrismaService
  ) { }

  async storeCompression(s3Key: string, userId: string): Promise<string> {
    const compression = await this.prismaService.compression.create({
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
    return compression.id;
  }

  async getS3KeyById(userId: string, compressionId: string) {
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
