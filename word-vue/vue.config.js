module.exports = {
    publicPath: './',
    pwa: {
        name: '语言测试项目word版',
        themeColor: "#4DBA87",
        msTileColor: "#000000",
        appleMobileWebAppCapable: "yes",
        appleMobileWebAppStatusBarStyle: "black",
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: "./src/service-worker.js",
        },
    }
}
