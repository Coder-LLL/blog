const { defineConfig } = require("@vue/cli-service");
const path = require("path");
// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  publicPath: "./", // 基本路径
  outputDir: "dist", // 输出文件目录
  assetsDir: "static", //放置生成的静态文件目录（js css img）
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  transpileDependencies: true,
  publicPath: "./",
  chainWebpack(config) {
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
  parallel: false,
  // configureWebpack: (config) => {
  //   return {
  //     // plugins: [new BundleAnalyzerPlugin()],
  //   };
  // },

  // configureWebpack: (config) => {
  //   return {
  //     optimization: {
  //       splitChunks: {
  //         chunks: "all", // 可选值：all，async 和 initial。all功能最强大，所以咱们就使用all
  //         maxInitialRequests: Infinity, // 最大并行请求数，为了以防万一，设置无穷大即可
  //         minSize: 20000, // 引入的模块大于20kb才做代码分割，官方默认20000，这里不用修改了
  //         maxSize: 60000, // 若引入的模块大于60kb，则告诉webpack尝试再进行拆分
  //         cacheGroups: {
  //           vendors: {
  //             test: /[\\/]node_modules[\\/]/, // 使用正则匹配node_modules中引入的模块
  //             priority: -10, // 优先级值越大优先级越高，默认-10，不用修改
  //           },
  //         },
  //       },
  //     },
  //   };
  // },
  // 分包
});
