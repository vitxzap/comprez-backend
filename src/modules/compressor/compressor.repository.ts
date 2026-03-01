import { Injectable, NotFoundException } from '@nestjs/common';
import { CompressorContract } from './compressor.contract';
import { PrismaService } from 'src/database/prisma/prisma.service';


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
}
