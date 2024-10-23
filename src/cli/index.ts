import * as fs from "node:fs";
import * as path from "node:path";

import { FileReader } from "../engine/file.reader";

const fileNames = fs.readdirSync(path.resolve(__dirname, "..", "pages"));

const filesToBeMapped = fileNames.filter((file) => file.includes(".tsx"));

filesToBeMapped.forEach((file) => {
  const fileReader = new FileReader(file);

  fileReader.createClientFile();
});
