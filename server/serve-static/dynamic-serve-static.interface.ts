import { ServeStaticModuleOptions } from "@nestjs/serve-static";
import { Configuration } from "webpack";

export interface DynamicServeStaticOptions extends ServeStaticModuleOptions{
  webpackConfig: Configuration
}