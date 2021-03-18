import { Controller, Get, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardSchema } from 'src/board.schema';
import { User, UserSchema } from 'src/user.schema';
import { SampleController } from './sample.controller';
import { SampleMiddleware } from './sample.middleware';
import { SampleService } from './sample.service';

@Module({
  imports: [
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
      .exclude(
        { path: 'sapmle', method: RequestMethod.POST },
        'sample/(.*)',
      )
      // .forRoutes({path: 'sample', method: RequestMethod.GET})
      .forRoutes(SampleController)
  }
}
