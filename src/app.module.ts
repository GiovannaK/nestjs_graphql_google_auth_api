import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
      }),
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
