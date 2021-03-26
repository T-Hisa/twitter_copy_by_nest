import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { BoardsService } from './boards/boards.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/:id')
  findAll(@Param() params): string {
    return `getId is ${params.id}`;
  }

  @Get()
  getHello(): string {
    console.log('hello')
    return this.appService.getHello();
  }
}
