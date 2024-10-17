import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/product/product.module';
import { DatabaseModule } from './shared/modules/database.module';
import { CategoryModule } from './modules/category/category.module';
import { MediaModule } from './modules/media/media.module';
import { FastifyMulterModule } from '@nest-lab/fastify-multer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    FastifyMulterModule,

    ProductModule,
    CategoryModule,
    MediaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
