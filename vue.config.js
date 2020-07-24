module.exports = {
    publicPath: '/nugget',
    outputDir: 'docs',
    filenameHashing: false,
    productionSourceMap: false,
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/variables.scss";`
            }
        }
    }
}