import { Injectable } from '@nestjs/common';
import { VideoContract } from './video.contract';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { FileJobData, FileJobNames, FileToQueue } from 'src/common/types/index';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Video } from 'generated/prisma/client';

@Injectable()
export class VideoRepository implements VideoContract {
  constructor(
    @InjectQueue('video')
    private videoQueue: Queue<FileJobData, any, FileJobNames>,
    private readonly prismaService: PrismaService
  ) { }


  // Send the file to the compression queue, so the worker can process it
  async compressFile(data: FileToQueue): Promise<string | undefined> {
    const job = await this.videoQueue.add(
      'compress',
      {
        userId: data.userId,
        ext: data.ext,
        originalName: data.originalName,
        originalSize: data.originalSize
      },
      {
        jobId: data.jobId
      }
    );
    return job.id;
  }


  //Save the compression metadata to the database.
  async saveCompressionData(file: Video): Promise<void> {
    this.prismaService.video.create({
      data: {
        originalname: file.originalname,
        userId: file.userId,
        destination: file.destination,
        ext: file.ext,
        preset: file.preset,
        originalSize: file.originalSize,
        compressedSize: file.compressedSize,
      }
    })
  }
}
