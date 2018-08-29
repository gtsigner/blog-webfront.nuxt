//import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
module.exports = {
    srcDir: "./app",
    transition: "fade",
    env: {
        API_BASE: process.env.API_BASE || "https://blog.oeynet.com/api/v1",
        dev: false
    },
    router: {
        middleware: ["base", "user-agent"]
    },
    css: [
        {src: "~/assets/scss/app.scss", lang: "scss"} // 指定 scss 而非 sass
        // {src: 'element-ui/lib/theme-chalk/index.css', lang: 'css'}, //ele样式
    ],
    /*
    ** Headers of the page
    */
    head: {
        titleTemplate: "%s - 易猿博客 · 分享知识的平台",
        meta: [
            {charset: "utf-8"},
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1, user-scalable=0"
            },
            {name: "keywords", content: "易猿博客·高性能的微服务博客"},
            {name: "description", content: "易猿博客·高性能的微服务博客"}
        ],
        link: [
            {rel: "icon", type: "image/x-icon", href: "/favicon.ico"},
            {
                rel: "stylesheet",
                href: "//unpkg.com/element-ui/lib/theme-chalk/index.css"
            }
            //{rel: 'stylesheet', href: '//cdn.bootcss.com/bootstrap/4.0.0/css/bootstrap.min.css'},
        ],
        script: [
            {src: "//cdn.bootcss.com/lodash.js/4.17.10/lodash.min.js"},
            {src: "//cdn.bootcss.com/axios/0.18.0/axios.min.js"}
        ]
    },
    /*
    ** Customize the progress bar color
    */
    loading: {color: "#17a9ff", height: "3px"},
    plugins: [
        {
            src: "~/plugins/index",
            ssr: true
        },
        // {
        //   src: '~/plugins/components',
        //   ssr: false
        // },
        {
            src: "~/plugins/ele",
            ssr: true
        }
    ],
    /*
    ** Build configuration
    */
    build: {
        /*
        ** Run ESLint on save
        */
        extend(config, {isDev, isClient, isServer}) {
            const sassResourcesLoader = {
                loader: "sass-resources-loader",
                options: {
                    resources: ["app/assets/scss/_variables.scss"]
                }
            };
            // 遍历nuxt定义的loader配置，向里面添加新的配置。
            config.module.rules.forEach(rule => {
                if (rule.test.toString() === "/\\.vue$/") {
                    rule.options.loaders.scss.push(sassResourcesLoader);
                }
                if (["/\\.sass$/", "/\\.scss$/"].indexOf(rule.test.toString()) !== -1) {
                    rule.use.push(sassResourcesLoader);
                }
            });

            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: "pre",
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    exclude: /(node_modules)/
                });
            }
            if (!isClient) {
                config.externals = {
                    axios: "axios",
                    loadsh: "_"
                };
            }
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
        vendor: ["axios", "lodash", "vue-markdown"],
        //maxChunkSize: 30000, // value in octet
        //maxChunkSize: 200000 // value in octet
        optimization: {
            splitChunks: {
                chunks: "async"
            }
        },
        splitChunks: {
            pages: false,
            vendor: true,
            commons: false,
            runtime: false,
            layouts: false
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
