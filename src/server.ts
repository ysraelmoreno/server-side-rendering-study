require("@babel/register")({
  extensions: [".ts", ".tsx", ".js", ".jsx"],
});

import { Engine } from "./engine/engine";

const bootstrap = () => {
  new Engine();
};

bootstrap();
