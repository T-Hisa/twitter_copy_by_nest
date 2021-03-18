import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './boards.module';
import { SampleModule } from './sample/sample.module';

@Module({
  imports: [
    BoardModule,
    SampleModule,
    MongooseModule.forRoot('mongodb://localhost:27017/sample'/*, {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'))
        return connection
      }
    }*/),
  ],
  controllers: [],
  providers: [],
})
export class CoreModule {}
