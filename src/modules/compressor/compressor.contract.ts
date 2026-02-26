import { RequestS3UploadDto } from 'src/aws/s3/dtos/aws.s3.dto';
export abstract class CompressorContract {
  abstract requestS3Upload(params: RequestS3UploadDto, userId: string): Promise<string | undefined | void>;
  abstract requestS3Download(params: RequestS3UploadDto): Promise<string | undefined | void>;
}
