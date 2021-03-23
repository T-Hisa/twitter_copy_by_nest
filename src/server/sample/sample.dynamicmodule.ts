import { Module, DynamicModule } from '@nestjs/common';
// import { createDatabaseProviders } from './database.providers';
// import { Connection } from './connection.provider';

@Module({
  providers: [],
})
export class SampleDynammicModule {
  static forRoot(entities = [], options?): DynamicModule {
    // const providers = createDatabaseProviders(options, entities);
    const providers = []
    return {
      module: SampleDynammicModule,
      providers: providers,
      exports: providers,
    };
  }
}

// https://docs.nestjs.com/fundamentals/dynamic-modules