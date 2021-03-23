import { ServeStaticModule } from '@nestjs/serve-static';
import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import {ServeStaticService} from './serve-static.service'

@Module({
  providers: []
})
export class DynamicServeStaticModule implements OnModuleInit {
  static register(options: any): DynamicModule {
    return process.env.NODE_ENV === 'development' ?
      {
        module: DynamicServeStaticModule,
        // providers: ServeStaticService.init()
      } :
      ServeStaticModule.forRoot(options)
  }

  onModuleInit() {
    console.log('env', process.env.NODE_ENV)
    if (process.env.NODE_ENV !== 'development') return;

  }

}