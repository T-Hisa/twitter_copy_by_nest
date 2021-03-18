import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {join} from "path"
import { CoreModule } from './app.module';
// import { BoardModule } from './boards.module';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(CoreModule);
  app.useStaticAssets(join(__dirname, '../public'))
  app.setBaseViewsDir(join(__dirname, '../views'))
  app.setViewEngine('hbs')
  await app.listen(3000);
}
bootstrap();
