//import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  transition: 'fade',
  router: {
    middleware: ['base', 'user-agent']
  },
  css: [
    {src: '~assets/scss/app.scss', lang: 'scss'}, // 指定 scss 而非 sass
    // {src: 'element-ui/lib/theme-chalk/index.css', lang: 'css'}, //ele样式
  ],
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - 易猿博客 · 分享知识的平台',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=0'},
      {name: 'keywords', content: '易猿博客·高性能的微服务博客'},
      {name: 'description', content: '易猿博客·高性能的微服务博客'},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: '//unpkg.com/element-ui/lib/theme-chalk/index.css'},
      //{rel: 'stylesheet', href: '//cdn.bootcss.com/bootstrap/4.0.0/css/bootstrap.min.css'},
    ],
    script: [
      {type: 'text/javascript', src: '//cdn.bootcss.com/axios/0.18.0/axios.min.js'},
      {type: 'text/javascript', src: '//cdn.bootcss.com/lodash.js/4.17.10/lodash.min.js'},
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#17a9ff', height: '3px'},
  plugins: [
    {
      src: '~/plugins/index',
      ssr: true
    },
    // {
    //   src: '~/plugins/components',
    //   ssr: false
    // },
    {
      src: '~/plugins/ele',
      ssr: true
    },
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
        loader: 'sass-resources-loader',
        options: {
          resources: [
            'assets/scss/_variables.scss'
          ]
        }
      };
      // 遍历nuxt定义的loader配置，向里面添加新的配置。
      config.module.rules.forEach((rule) => {
        if (rule.test.toString() === '/\\.vue$/') {
          rule.options.loaders.scss.push(sassResourcesLoader)
        }
        if (['/\\.sass$/', '/\\.scss$/'].indexOf(rule.test.toString()) !== -1) {
          rule.use.push(sassResourcesLoader)
        }
      });

      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.externals = {
        'axios': 'axios',
        'lodash': 'lodash',
      };
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
    vendor: ['axios', 'lodash', 'vue-markdown']
  },
  dev: (process.env.NODE_ENV !== 'production'),
  env: {
    WS_URL: 'https://team.oeynet.com',
    API_URL: 'http://team.oeynet.com/api/v1',
    API_URL_HTTPS: 'https://team.oeynet.com/api/v1',
  },
  cache: {
    max: 1000,
    maxAge: 900000
  }
};
