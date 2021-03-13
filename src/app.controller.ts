import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Request} from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/:id')
  findAll(@Param() params): string {
    return `getId is ${params.id}`
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
