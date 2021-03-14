import { Controller, Get, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { BoardModule } from '../boards.module';
import { SampleController } from './sample.controller';
import { SampleMiddleware } from './sample.middleware';
import { SampleService } from './sample.service';

@Module({
  imports: [],
  controllers: [SampleController],
  providers: [SampleService],
})
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
