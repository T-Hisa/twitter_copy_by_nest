import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './boards.module';
// import { SampleModule } from './sample.module';

@Module({
  imports: [BoardModule],
  controllers: [],
  providers: [],
})
export class CoreModule {}
