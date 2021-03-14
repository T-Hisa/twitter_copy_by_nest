import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './boards.module';
import { SampleModule } from './sample/sample.module';

@Module({
  imports: [BoardModule, SampleModule],
  controllers: [],
  providers: [],
})
export class CoreModule {}
