import { getHttpsServerOptions } from "office-addin-dev-certs";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as dotenv from "dotenv";

dotenv.config();

const getHttpsOptions = async () => {
  const httpsOptions = await getHttpsServerOptions();

  return {
    ca: httpsOptions.ca,
    key: httpsOptions.key,
    cert: httpsOptions.cert,
  };
};

export default async (env, options) => ({
  entry: {
    taskpane: ["./src/taskpane/taskpane.ts", "./src/taskpane/taskpane.html"],
  },
  output: {
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".html", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: "html-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][ext][query]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "taskpane.html",
      template: "./src/taskpane/taskpane.html",
      chunks: ["taskpane"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "assets/*",
          to: "assets/[name][ext][query]",
        },
        {
          from: "manifest*.xml",
          to: "[name]" + "[ext]",
          transform: (content) =>
            content
              .toString()
              .replaceAll("%BASE_URL%", process.env.BASE_URL)
              .replaceAll("%SUPPORT_URL%", process.env.SUPPORT_URL)
              .replaceAll("%AUTHOR_URL%", process.env.AUTHOR_URL)
              .replaceAll("%PROVIDER_NAME%", process.env.PROVIDER_NAME),
        },
      ],
    }),
  ],
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    server: {
      type: "https",
      options: env.WEBPACK_BUILD || options.https || (await getHttpsOptions()),
    },
    port: process.env.PORT,
  },
});
