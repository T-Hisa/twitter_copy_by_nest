import { Controller, Get, Module } from '@nestjs/common';
import { BoardModule } from './boards.module';

@Controller()
class SampleController {
  // constructor() {}
  @Get('sample')
  sample(): string {
    return 'this is Sample'
  }
}

@Module({
  imports: [],
  controllers: [SampleController],
  providers: [],
})
export class SampleModule {}
