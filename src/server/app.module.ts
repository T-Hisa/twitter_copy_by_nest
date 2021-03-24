import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './boards.module';
import { SampleModule } from './sample/sample.module';
import { DynamicServeStaticModule } from './serve-static/dynamic-serve-static.module';
import * as frontWebpackConfig from '../../webpack/front/webpack.dev';
import { Configuration } from 'webpack';

@Module({
  imports: [
    // BoardModule,
    // SampleModule,
    // ConfigModule.forRoot({
    //   envFilePath: '.development.env',
    // }),
    // MongooseModule.forRoot(
    //   'mongodb://localhost:27017/sample' /*, {
    //   connectionFactory: (connection) => {
    //     connection.plugin(require('mongoose-autopopulate'))
    //     return connection
    //   }
    // }*/,
    // ),
    DynamicServeStaticModule.forRoot({
      renderPath: '/*',
      rootPath: path.join(process.cwd(), 'dist/src/front'),
      webpackConfig: frontWebpackConfig() as Configuration,
    }),
  ],
  controllers: [],
  providers: [],
})
export class CoreModule {}
