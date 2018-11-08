module.exports = {
  baseUrl: process.env.PUBLIC_PATH,
  css: {
    sourceMap: true
  },
  configureWebpack: {
    resolve: {
      mainFields: ["module", "browser", "main"]
    }
  }
};
