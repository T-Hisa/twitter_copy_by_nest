import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { CoreModule } from './app.module';
// import webpack, {Configuration} from 'webpack'
// import history from 'connect-history-api-fallback'
// import webpackDevMiddleware from 'webpack-dev-middleware'
// import webpackHotMiddleware from 'webpack-hot-middleware'
// import frontWebpackConfig from '../../webpack/front/webpack.dev'
// import { BoardModule } from './boards.module';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(CoreModule);
  app.useStaticAssets(join(__dirname, '../public'));
  app.setBaseViewsDir(join(__dirname, '../views'));
  // console.log('webpackConfig', frontWebpackConfig)
  // const compiler = webpack(frontWebpackConfig as Configuration)

  // app.use(webpackDevMiddleware(compiler))
  // app.use(webpackHotMiddleware(compiler))
  // app.use(history())
  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();
