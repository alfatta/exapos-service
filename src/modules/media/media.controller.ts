import { File, FileInterceptor } from '@nest-lab/fastify-multer';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  private s3 = new S3({
    endpoint: process.env.S3_ENDPOINT,
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    s3ForcePathStyle: true,
  });

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 2 * 1024 * 1024 }, // Limit upload file up to 2MB
    }),
  )
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async upload(@UploadedFile() { buffer, mimetype, originalname }: File) {
    const fileExt = originalname.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;

    const params: S3.PutObjectRequest = {
      Bucket: process.env.S3_BUCKET || 'default',
      Body: buffer,
      ContentType: mimetype,
      Key: fileName,
      ACL: 'public-read',
    };

    try {
      const uploadResult = await this.s3.upload(params).promise();
      return {
        data: {
          url: uploadResult.Location,
          mimetype,
        },
      };
    } catch (error) {
      throw new Error(`File upload failed: ${error.message}`);
    }
  }
}
