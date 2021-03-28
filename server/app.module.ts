import * as path from 'path';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './boards/boards.module';
import { SampleModule } from './sample/sample.module';
import { DynamicServeStaticModule } from './serve-static/dynamic-serve-static.module';
import * as clientWebpackConfig from '../webpack/client/webpack.dev';
import { Configuration } from 'webpack';
import { SampleMiddleware } from './sample/sample.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    BoardModule,
    // SampleModule,
    AuthModule,
    // ConfigModule.forRoot({
    //   envFilePath: '.development.env',
    // }),
    MongooseModule.forRoot(
      'mongodb://localhost:27017/sample' /*, {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'))
        return connection
      }
    }*/,
    ),
    DynamicServeStaticModule.forRoot({
      renderPath: '/*',
      rootPath: path.join(process.cwd(), 'dist/src/front'),
      webpackConfig: clientWebpackConfig() as Configuration,
    }),
  ],
  controllers: [],
  providers: [],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SampleMiddleware).forRoutes('/*')
  }
}
