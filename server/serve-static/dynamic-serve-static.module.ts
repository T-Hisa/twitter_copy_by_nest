import { DynamicModule, Inject, Module, OnModuleInit } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { DYNAMIC_SERVE_STATIC_OPTIONS } from './dynamic-serve-static.constant';
import { DynamicServeStaticOptions } from './dynamic-serve-static.interface';

import { ServeStaticModule } from '@nestjs/serve-static';
import { DynamicServeStaticService } from './dynamic-serve-static.service';

@Module({
  providers: [DynamicServeStaticService],
})
export class DynamicServeStaticModule implements OnModuleInit {
  constructor(
    @Inject(DYNAMIC_SERVE_STATIC_OPTIONS)
    private readonly dynamicServeStaticOptions: DynamicServeStaticOptions,
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly dynamicServeStaticService: DynamicServeStaticService,
  ) {}

  static forRoot(options: DynamicServeStaticOptions): DynamicModule {
    return process.env.NODE_ENV === 'development'
      ? {
          module: DynamicServeStaticModule,
          providers: [
            {
              provide: DYNAMIC_SERVE_STATIC_OPTIONS,
              useValue: options,
            },
          ],
        }
      : ServeStaticModule.forRoot(options);
  }

  public async onModuleInit() {
    if (process.env.NODE_ENV !== 'development') return;

    const { httpAdapter } = this.httpAdapterHost;
    const { webpackConfig } = this.dynamicServeStaticOptions;
    this.dynamicServeStaticService.init(httpAdapter, webpackConfig);
  }
}
