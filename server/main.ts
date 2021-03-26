import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { RootModule } from './root/root.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(RootModule);
  // app.useStaticAssets(join(__dirname, '../public'));
  // app.setBaseViewsDir(join(__dirname, '../views'));
  await app.listen(3000);
}
bootstrap();
