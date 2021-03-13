import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CoreModule } from './app.module';
// import { BoardModule } from './boards.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(CoreModule);
  await app.listen(3000);
}
bootstrap();
