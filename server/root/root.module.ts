import * as path from 'path';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardModule } from '../boards/boards.module';
import { SampleModule } from '../sample/sample.module';
import { DynamicServeStaticModule } from '../serve-static/dynamic-serve-static.module';
import * as frontWebpackConfig from '../../webpack/client/webpack.dev';
import { Configuration } from 'webpack';
import { RootMiddleware } from './root.midddleware';
import { RootController } from './root.controller';

@Module({
  imports: [
    BoardModule,
    // SampleModule,
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
      webpackConfig: frontWebpackConfig() as Configuration,
    }),
  ],
  controllers: [],
  providers: [],
})
export class RootModule {}
