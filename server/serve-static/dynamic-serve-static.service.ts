import { Injectable } from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';
import { Configuration, Entry, EntryFunc } from 'webpack';
import * as webpack from 'webpack'
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
import * as history from "connect-history-api-fallback";

@Injectable()
export class DynamicServeStaticService {
  async init(app: AbstractHttpAdapter, options: Configuration) {
    // const compiler: Compiler = webpack({
    //   ...options,
    //   mode: "development",
    //   entry: await this.appendHotMiddlewareToEntry(options.entry),
    //   // plugins: [...options.plugins, new webpack.HotModuleReplacementPlugin()],
    // });
    const compiler = webpack(options);
    const WDM = webpackDevMiddleware(compiler)
    app.use(WDM)
    const WHM = webpackHotMiddleware(compiler)
    app.use(WHM)
    app.use(history())
  }


  private async appendHotMiddlewareToEntry(
    entry: string | string[] | Entry | EntryFunc,
  ) {
    const hot = "webpack-hot-middleware/client?reload=true&timeout=1000";
    let e = entry;
    e = e instanceof Function ? await e() : e;
    if (e instanceof Array) return [...(e as string[]), hot];
    else if (typeof e === "string") return [e, hot];
    else {
      for (const key in e) {
        if (e[key] instanceof Array) e[key] = [...e[key], hot];
        else e[key] = [e[key], hot] as string[];
      }
      return e;
    }
  }
}
