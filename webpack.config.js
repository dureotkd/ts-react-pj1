const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".css"],
    modules: [path.join(__dirname, "src"), "node_modules"],
  },
  module: {
    rules: [
      {
        test: /.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.(ts|tsx)$/, // TypeScript 파일을 처리하기 위한 설정
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "build"), // build시 만들어질 폴더 경로
    filename: "bundle.js", // build시 만들어질 번들 파일명
    publicPath: "/", // 웹팩의 출력 자산이 웹 서버에서 제공되는 경로를 정의합니다.
    asyncChunks: true, // 비동기 청크의 캐시 효율성을 높이고, 필요할 때만 로드되도록 처리합니다.
  },
  devServer: {
    static: { directory: path.join(__dirname, "public") }, // dev-server 참고할 static파일 주소
    compress: true, // 문자열 압축 관련여부
    host: "localhost", // dev-server host명
    port: 3000, // dev-server port명
    historyApiFallback: true, // 모든 경로를 index.html로 리디렉션 해줘야한다.
  },
  plugins: [
    new HtmlWebpackPlugin({
      // idnex.html에 webpack에서 bundle된 파일을 link 해줌
      template: "./public/index.html",
      filename: "index.html",
    }),
  ],
};
