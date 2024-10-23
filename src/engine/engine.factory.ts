import * as fs from "fs";
import * as path from "path";

export interface IMappedRoutes {
  page: string;
  url: string;
}

export interface IEngineConfig {
  viewsDir: string;
  routes?: IMappedRoutes[];
}

export class EngineFactory {
  protected config: IEngineConfig;

  private NECESSARY_KEYS: string[] = [];

  constructor() {
    this.config = this.readConfigFile();
  }

  protected mapFilesToConfigRouter(files: string[]): IMappedRoutes[] {
    const { routes } = this.config;

    if (!routes) {
      return files.map((file) => ({
        page: file,
        url: `/${file.replace(/\.html|\.tsx/gm, "")}`,
      }));
    }

    return files.map((file) => {
      const findedRoute = routes.find((route) => route.page === file);

      if (!findedRoute)
        return { page: file, url: `/${file.replace(/\.html|\.tsx/gm, "")}` };

      return findedRoute;
    });
  }

  public readConfigFile(): IEngineConfig {
    const config = fs.readFileSync(
      path.resolve(__dirname, "..", "config.json"),
      {
        encoding: "utf-8",
      }
    );

    const json = JSON.parse(config);

    Object.keys(this.NECESSARY_KEYS).forEach((key) => {
      if (!Object.keys(json).includes(key)) {
        throw new Error(
          "Config file doesnt has all the necessary configurations."
        );
      }
    });

    return json;
  }
}
