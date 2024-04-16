/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    // if (!isServer) {
    //   // 解決瀏覽器環境下缺少 Node.js 模塊的問題
    //   config.resolve.fallback = {
    //     ...config.resolve.fallback,
    //     buffer: require.resolve("buffer/"), // 指向 buffer 模塊
    //     // process: require.resolve("process/browser"), // 指向 process 模塊
    //   };

    //   // 配置全局變量
    //   config.plugins.push(
    //     new webpack.ProvidePlugin({
    //       Buffer: ["buffer", "Buffer"], // Buffer 可以全局訪問
    //       // process: "process/browser", // process 可以全局訪問
    //     })
    //   );
    // }
    return config;
  },
};

module.exports = nextConfig;
