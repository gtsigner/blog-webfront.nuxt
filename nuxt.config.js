//import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
module.exports = {
    mode: 'universal',
    srcDir: "./app",
    transition: "fade",
    env: {
        API_BASE: process.env.API_BASE || "https://blog.oeynet.com/api/v1",
        dev: process.env.NODE_ENV !== "production",
    },
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
        baseURL: process.env.API_BASE || "https://blog.oeynet.com/api/v1",
        timeout: 5000,
        loadingBar: false,
    },
    router: {
        middleware: ["base", "user-agent"]
    },
    css: [
        { src: "~/assets/scss/app.scss", lang: "scss" } // 指定 scss 而非 sass
        // {src: 'element-ui/lib/theme-chalk/index.css', lang: 'css'}, //ele样式
    ],
    /*
    ** Headers of the page
    */
    head: {
        titleTemplate: "%s - 易猿博客 · 分享知识的平台",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1, user-scalable=0"
            },
            { name: "keywords", content: "易猿博客·高性能的微服务博客" },
            { name: "description", content: "易猿博客·高性能的微服务博客" }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            {
                rel: "stylesheet",
                href: "//unpkg.com/element-ui/lib/theme-chalk/index.css"
            }
            //{rel: 'stylesheet', href: '//cdn.bootcss.com/bootstrap/4.0.0/css/bootstrap.min.css'},
        ],
        script: [
            { src: "//cdn.bootcss.com/lodash.js/4.17.10/lodash.min.js" },
            //{ src: "//cdn.bootcss.com/axios/0.18.0/axios.min.js" }
        ]
    },
    /*
    ** Customize the progress bar color
    */
    loading: { color: "#17a9ff", height: "3px" },
    plugins: [
        {
            src: "~/plugins/index",
            ssr: true
        },
        '~/plugins/axios',
        // {
        //   src: '~/plugins/components',
        //   ssr: false
        // },
        {
            src: "~/plugins/ele",
            ssr: true
        }
    ],
    modules: [
        // Doc: https://github.com/nuxt-community/axios-module#usage
        '@nuxtjs/axios',
        ['nuxt-sass-resources-loader', '@/assets/scss/_variables.scss'],
    ],
    /*
    ** Build configuration
    */
    build: {
        filenames: {
            chunk: ({ isDev }) => isDev ? '[name].js' : '[id].[chunkhash].js'
        },
        extractCSS: true,
        cache: false,
        cssSourceMap: false,
        optimization: {
            minimize: true,
            minimizer: [
                // terser-webpack-plugin
                // optimize-css-assets-webpack-plugin
            ],
            splitChunks: {
                chunks: 'all',
                automaticNameDelimiter: '.',
                name: undefined,
                cacheGroups: {}
            }
        },
        /*
        ** Run ESLint on save
        */
        extend(config, { isDev, isClient, isServer }) {

        },
        plugins: [
            // new SkeletonWebpackPlugin({
            //   webpackConfig: {
            //     entry: {
            //       app: resolve('./src/entry-skeleton.js')
            //     }
            //   }
            // })
            //new BundleAnalyzerPlugin()
        ],
        vendor: ["lodash"],
        //配置loader options
        loaders: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    analyze: false,
    babel: {
        plugins: ["transform-decorators-legacy", "transform-class-properties"]
    },
    dev: process.env.NODE_ENV !== "production",
    cache: {
        max: 1000,
        maxAge: 900000
    }
};
