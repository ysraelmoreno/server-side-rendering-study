import * as fs from "node:fs";
import * as path from "node:path";

export class FileReader {
  constructor(private readonly fileName: string) {}

  createClientFile() {
    const content = `
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from "../../src/pages/${this.fileName}"

const container = document.getElementById('root');

if (container) {
  hydrateRoot(container, <App />);
}
`;

    if (!fs.existsSync("./public/build/")) {
      fs.mkdirSync("./public/build/", { recursive: true });
    }

    if (fs.existsSync(`./public/build/client-${this.fileName}`)) return;

    fs.appendFileSync(`./public/build/client-${this.fileName}`, content);
  }
}
