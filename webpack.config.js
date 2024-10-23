const path = require("path");
const glob = require("glob");

module.exports = {
  entry: glob.sync("./public/build/**/*.tsx").reduce((acc, path) => {
    /**
     * The "[name]" placeholder in the "output" property will be replaced
     * with each key name in our "entry" object. We need to make sure the
     * keys are a path to the "index.js" file but without the actual file
     * name. This is why we replace the file name, "index.js", with a string
     */

    const entry = path.replace(/\.(tsx|ts|js|jsx)/gm, "");
    /**
     * Here we start building our object by placing the "entry" variable from
     * the previous line as a key and the entire path including the file name
     * as the value
     */
    acc[entry] = path;
    return acc;
  }, {}),
  output: {
    path: path.resolve(__dirname),
    filename: "./[name]/main.js",
  },
  module: {
    rules: [
      {
        test: /.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
};
