import { Controller, Get, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardSchema } from 'src/server/board.schema';
import { User, UserSchema } from 'src/server//user.schema';
import { SampleController } from './sample.controller';
import { SampleMiddleware } from './sample.middleware';
import { SampleService } from './sample.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    MongooseModule.forFeature([{name: 'Board', schema: BoardSchema}]),
  //   MongooseModule.forFeatureAsync([
  //     {
  //       name: 'Board',
  //       useFactory: () => {
  //         const schema = BoardSchema
  //         schema.plugin(require('mongoose-autopopulate'))
  //         return schema
  //       }
  //     }
  // ]),
  ],
  controllers: [SampleController],
  providers: [SampleService],
})
// export class SampleModule {}
export class SampleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SampleMiddleware)
      // .exclude(
      //   { path: 'sapmle', method: RequestMethod.POST },
      //   'sample/(.*)',
      // )
      // .forRoutes({path: 'sample', method: RequestMethod.GET})
      .forRoutes(SampleController)
  }
}
