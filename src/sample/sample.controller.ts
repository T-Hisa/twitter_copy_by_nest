import {
  Body,
  Controller,
  DefaultValuePipe,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import Joi from 'joi';
import { SampleDto } from './sample.dto';
import { SampleHttpExceptionFilter } from './sample.http-exception.filter';
import {
  SampleJoiValidationPipe,
  SampleValidationPipeWithClassValidator,
} from './sample.pipe';
import { sampleSchema } from './sample.schema';
import { SampleService } from './sample.service';
import { SampleAuthGuard } from './sample.auth.guard'
import { SampleLoggingInterceptor } from './sample.interceptor';

@Controller('/sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Get()
  getBoards(): string {
    return 'this is sample';
  }

  @Get('/error')
  causeError() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'Causes Error',
      },
      HttpStatus.FORBIDDEN,
    );
  }

  // userFiltersデコレータは、
  // 1. 今回のように method につける
  // 2. controller につける
  // 3. global(main.tsファイル) につける ことができる
  //      |-> app.useGlobalFilters(new SampleHttpExceptionFilter())
  @Get('customError')
  @UseFilters(SampleHttpExceptionFilter)
  async create(@Body() createSample: string) {
    throw new ForbiddenException();
  }

  @Get('sample-pipe/:id')
  async samplePipe(@Param('id',new DefaultValuePipe(0), ParseIntPipe) id: number): Promise<string> {
    // async samplePipe(
    //   @Param(
    //     'id',
    //     new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    //   )
    //   id: number,
    // ): Promise<string> {
    console.log(`${id}`);
    return `this is sample pipe ${id}`;
  }

  @Post('sample-validate-pipe')
  @UsePipes(new SampleJoiValidationPipe(sampleSchema))
  async createSampleDto(@Body() sampleDto: SampleDto) {
    this.sampleService.create(sampleDto);
  }

  @Post('sample-validate-class')
  async createSampleClass(
    @Body(new SampleValidationPipeWithClassValidator()) sampleDto: SampleDto,
  ) {
    this.sampleService.create(sampleDto);
  }
  
  @Get('/sample-auth-guard')
  @UseGuards(SampleAuthGuard)
  async sampleAuthGuard() {
    return "this is sample with auth guard!!!"
  }

  @Get('/sample-use-interceptor')
  @UseInterceptors(SampleLoggingInterceptor)
  sampleLogging() {
    return 'this is sample logging with interceptor!'
  }
}
