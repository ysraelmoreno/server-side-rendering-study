import { EngineFactory } from "./engine.factory";
import express, { Response, Request, Router } from "express";
import * as fs from "fs";
import * as path from "path";
import { PageBuilder } from "./page.builder";
import { PageRenderer } from "./page.renderer";
import { FileReader } from "./file.reader";

export class Engine extends EngineFactory {
  constructor() {
    super();
    this.createRoutes();
  }

  protected readPagesDir() {
    const { viewsDir } = this.config;

    const filesNames = fs.readdirSync(path.resolve(__dirname, "..", viewsDir));

    return filesNames;
  }

  protected createRoutes() {
    const pagesFiles = this.readPagesDir();

    const app = express();

    app.use(
      "/build",
      express.static(path.resolve(__dirname, "../../public/build"))
    );

    const router = Router();

    const routes = this.mapFilesToConfigRouter(pagesFiles);

    for (const page of routes) {
      if (page.page.includes(".tsx")) {
        router.get(page.url, async (req: Request, res: Response) => {
          const renderer = new PageRenderer(page.page);

          const pageData = await renderer.renderString();

          res.send(pageData);
        });
      }

      router.get(page.url, (req: Request, res: Response) => {
        const fileData = fs.readFileSync(
          path.join(__dirname, "..", "pages", page.page),
          {
            encoding: "utf-8",
          }
        );

        const pageBuilder = new PageBuilder(fileData);

        res.send(
          pageBuilder.render({
            user: {
              firstName: "Ysrael",
              lastName: "Moreno",
              info: {
                civilStatus: "Married",
                contact: {
                  cellphone: "1111111",
                  tel: "333333",
                },
              },
            },
          })
        );
      });
    }

    app.use(router);

    app.listen(3333);
  }
}
