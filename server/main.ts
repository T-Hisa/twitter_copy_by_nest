import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { RootModule } from './root/root.module';
import * as session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(RootModule);
  app.use(session({
    secret: 'SECRET_KEY',
    resave: false,
    saveUninitialized: false,
    name: 'sid',
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 36000
    }
  }))
  // app.set('trust-proxy', 1)
  app.useStaticAssets(join(process.cwd(), 'dist', 'client'));
  // app.setBaseViewsDir(join(__dirname, '../views'));
  await app.listen(3000);
}
bootstrap();
