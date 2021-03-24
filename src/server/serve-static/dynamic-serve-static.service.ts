import { Injectable } from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';
import webpack, { Configuration, Entry, EntryFunc, ICompiler } from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import history from "connect-history-api-fallback";

@Injectable()
export class DynamicServeStaticService {
  async init(app: AbstractHttpAdapter, options: Configuration) {
    console.log('webpackOptions', options)
    // const compiler: Compiler = webpack({
    //   ...options,
    //   mode: "development",
    //   entry: await this.appendHotMiddlewareToEntry(options.entry),
    //   // plugins: [...options.plugins, new webpack.HotModuleReplacementPlugin()],
    // });
    const compiler: ICompiler = webpack(options) as ICompiler;
    console.log('debug')
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
