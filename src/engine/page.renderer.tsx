import React from "react";
import * as path from "path";
import { renderToString } from "react-dom/server";

export class PageRenderer {
  private fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  private renderBaseHTML(content: string) {
    const BASE_HTML = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Homepage</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/build/client-${this.fileName.replace(
          /\.html|\.tsx/gm,
          ""
        )}/main.js"></script>
      </body>
    </html>
`;

    return BASE_HTML;
  }

  async renderString() {
    const { default: Page } = await import(
      path.resolve(__dirname, "..", "pages", this.fileName)
    );

    const pageData = renderToString(<Page />);

    return this.renderBaseHTML(pageData);
  }
}
